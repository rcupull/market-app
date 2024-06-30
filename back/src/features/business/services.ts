import { FilterQuery, PaginateOptions, ProjectionType } from 'mongoose';
import { ModelDocument, QueryHandle } from '../../types/general';
import { Business } from '../../types/business';
import { BusinessModel } from '../../schemas/business';
import { postServicesDeleteMany } from '../post/services';
import { PaginateResult } from '../../middlewares/pagination';

import { UpdateOptions } from 'mongodb';
import { GetAllBusinessArgs, UpdateQueryBusiness, getAllFilterQuery } from './utils';
import { billingServices } from '../billing/services';
import { getShoppingWasAcceptedQuery } from '../../utils/schemas';
import { getShoppingsTotalDebit } from '../shopping/utils';
import { imagesServicesDeleteBulk } from '../images/services';
import { shoppingServicesDeleteMany, shoppingServicesGetAll } from '../shopping/services';

export const businessServicesGetAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllBusinessArgs;
  },
  PaginateResult<Business>
> = async ({ query, paginateOptions = {} }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await BusinessModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Business>;
};

export const businessServicesGetAll: QueryHandle<
  {
    query: GetAllBusinessArgs;
  },
  Array<Business>
> = async ({ query }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await BusinessModel.find(filterQuery);

  return out;
};

export const businessServicesAddOne: QueryHandle<
  Pick<Business, 'categories' | 'createdBy' | 'routeName' | 'name' | 'postCategories' | 'currency'>,
  Business | null
> = async ({ categories, createdBy, routeName, name, postCategories, currency }) => {
  const routeNameExists = await BusinessModel.findOne({ routeName });

  if (routeNameExists) {
    return null;
  }

  const out = new BusinessModel({
    categories,
    createdBy,
    name,
    routeName,
    postCategories,
    currency,
    hidden: true, //by default the businees is hidden
  });

  await out.save();

  return out;
};

export const businessServicesFindOne: QueryHandle<
  {
    query: FilterQuery<Business>;
    projection?: ProjectionType<Business>;
  },
  ModelDocument<Business> | null
> = async ({ query, projection }) => {
  const out = await BusinessModel.findOne(query, projection);

  return out;
};

export const businessServicesDeleteOne: QueryHandle<{
  routeName: string;
}> = async ({ routeName }) => {
  /**
   * Removing the business
   */
  const business = await BusinessModel.findOneAndDelete({
    routeName,
  });

  if (!business) {
    return;
  }

  /**
   * Remove all business images
   */

  await imagesServicesDeleteBulk({
    userId: business.createdBy.toString(),
    routeName,
  });

  /**
   * Remove all business posts
   */
  await postServicesDeleteMany({
    query: {
      routeName,
    },
  });

  /**
   * Remove all bills
   */

  await billingServices.deleteMany({
    query: {
      routeName,
    },
  });

  /**
   * Remove all shopping
   */

  await shoppingServicesDeleteMany({
    query: {
      routeName,
    },
  });
};

export const businessServicesUpdateOne: QueryHandle<{
  query: FilterQuery<Business>;
  update: UpdateQueryBusiness;
  options?: UpdateOptions;
}> = async ({ query, update, options }) => {
  await BusinessModel.updateOne(query, update, options);
};

export const businessServicesUpdateMany: QueryHandle<{
  query: FilterQuery<Business>;
  update: UpdateQueryBusiness;
}> = async ({ query, update }) => {
  await BusinessModel.updateMany(query, update);
};

export const businessServicesGetShoppingPaymentData: QueryHandle<
  {
    routeName: string;
  },
  { shoppingDebit: number }
> = async ({ routeName }) => {
  const { getAllShopingIds } = await billingServices.getBillDataFromShopping({
    query: { routeNames: [routeName] },
  });

  const shoppings = await shoppingServicesGetAll({
    query: {
      routeName,
      ...getShoppingWasAcceptedQuery(),
      excludeShoppingIds: getAllShopingIds(),
    },
  });

  return {
    shoppingDebit: getShoppingsTotalDebit(shoppings),
  };
};
