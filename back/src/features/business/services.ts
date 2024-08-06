import { FilterQuery, PaginateOptions, ProjectionType } from 'mongoose';
import { ModelDocument, QueryHandle } from '../../types/general';
import { Business } from '../../types/business';
import { BusinessModel } from '../../schemas/business';
import { postServicesDeleteMany } from '../post/services';
import { PaginateResult } from '../../middlewares/middlewarePagination';

import { UpdateOptions } from 'mongodb';
import { GetAllBusinessArgs, UpdateQueryBusiness, getAllFilterQuery } from './utils';
import {
  billingServicesDeleteMany,
  billingServicesGetBillDataFromShopping
} from '../billing/services';
import { getShoppingWasAcceptedQuery } from '../../utils/schemas';
import { getShoppingsTotalDebit } from '../shopping/utils';
import { imagesServicesDeleteBulk } from '../images/services';
import { shoppingServicesDeleteMany, shoppingServicesGetAll } from '../shopping/services';
import { PushNotificationBusinessData } from '../../types/notifications';

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
    projection?: ProjectionType<Business>;
  },
  Array<Business>
> = async ({ query, projection }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await BusinessModel.find(filterQuery, projection);

  return out;
};

export const businessServicesAddOne: QueryHandle<
  Pick<Business, 'createdBy' | 'routeName' | 'name' | 'postCategories' | 'currency'>,
  Business | null
> = async ({ createdBy, routeName, name, postCategories, currency }) => {
  const routeNameExists = await BusinessModel.findOne({ routeName });

  if (routeNameExists) {
    return null;
  }

  const out = new BusinessModel({
    createdBy,
    name,
    routeName,
    postCategories,
    currency,
    hidden: true //by default the businees is hidden
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

export const businessServicesGetBusinessDataForPushNotifications: QueryHandle<
  {
    routeName: string;
  },
  PushNotificationBusinessData | null
> = async ({ routeName }) => {
  const businessData = await businessServicesFindOne({
    query: {
      routeName
    },
    projection: {
      name: 1,
      createdBy: 1
    }
  });

  if (!businessData) {
    return null;
  }

  return {
    businessName: businessData.name,
    routeName,
    createdBy: businessData.createdBy
  };
};

export const businessServicesDeleteOne: QueryHandle<{
  routeName: string;
}> = async ({ routeName }) => {
  /**
   * Removing the business
   */
  const business = await BusinessModel.findOneAndDelete({
    routeName
  });

  if (!business) {
    return;
  }

  /**
   * Remove all business images
   */

  await imagesServicesDeleteBulk({
    userId: business.createdBy.toString(),
    routeName
  });

  /**
   * Remove all business posts
   */
  await postServicesDeleteMany({
    query: {
      routeName
    }
  });

  /**
   * Remove all bills
   */

  await billingServicesDeleteMany({
    query: {
      routeName
    }
  });

  /**
   * Remove all shopping
   */

  await shoppingServicesDeleteMany({
    query: {
      routeName
    }
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
  const { getAllShopingIds } = await billingServicesGetBillDataFromShopping({
    query: { routeNames: [routeName] }
  });

  const shoppings = await shoppingServicesGetAll({
    query: {
      routeName,
      ...getShoppingWasAcceptedQuery(),
      excludeShoppingIds: getAllShopingIds()
    }
  });

  return {
    shoppingDebit: getShoppingsTotalDebit(shoppings)
  };
};
