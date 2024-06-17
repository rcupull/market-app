import { FilterQuery, PaginateOptions, ProjectionType } from 'mongoose';
import { QueryHandle } from '../../types/general';
import { Business } from '../../types/business';
import { BusinessModel } from '../../schemas/business';
import { postServices } from '../post/services';
import { PaginateResult } from '../../middlewares/pagination';

import { imagesServices } from '../images/services';
import { UpdateOptions } from 'mongodb';
import { GetAllBusinessArgs, UpdateQueryBusiness, getAllFilterQuery } from './utils';

const getAllWithPagination: QueryHandle<
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

const getAll: QueryHandle<
  {
    query: GetAllBusinessArgs;
  },
  Array<Business>
> = async ({ query }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await BusinessModel.find(filterQuery);

  return out;
};

const addOne: QueryHandle<
  Pick<Business, 'categories' | 'createdBy' | 'routeName' | 'name' | 'postCategories'>,
  Business | null
> = async ({ categories, createdBy, routeName, name, postCategories }) => {
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
  });

  await out.save();

  return out;
};

const findOne: QueryHandle<
  {
    query: FilterQuery<Business>;
    projection?: ProjectionType<Business>;
  },
  Business | null
> = async ({ query, projection }) => {
  const out = await BusinessModel.findOne(query, projection);

  return out;
};

const deleteOne: QueryHandle<{
  routeName: string;
  userId: string;
}> = async ({ routeName, userId }) => {
  /**
   * Remove all business images
   */
  await imagesServices.deleteImagesBy({
    userId,
    routeName,
  });

  await BusinessModel.deleteOne({
    routeName,
    createdBy: userId,
  });

  const out = await postServices.deleteMany({
    routeName,
  });

  return out;
};

const updateOne: QueryHandle<{
  query: FilterQuery<Business>;
  update: UpdateQueryBusiness;
  options?: UpdateOptions;
}> = async ({ query, update, options }) => {
  await BusinessModel.updateOne(query, update, options);
};

const updateMany: QueryHandle<{
  query: FilterQuery<Business>;
  update: UpdateQueryBusiness;
}> = async ({ query, update }) => {
  await BusinessModel.updateMany(query, update);
};

export const businessServices = {
  getAllWithPagination,
  getAll,
  addOne,
  findOne,
  deleteOne,
  updateOne,
  updateMany,
};
