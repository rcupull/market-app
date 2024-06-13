import {
  FilterQuery,
  PaginateOptions,
  ProjectionType,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { QueryHandle } from '../../types/general';
import { Business } from '../../types/business';
import { BusinessModel } from '../../schemas/business';
import { postServices } from '../post/services';
import { PaginateResult, paginationCustomLabels } from '../../middlewares/pagination';

import { imagesServices } from '../images/services';
import { UpdateOptions } from 'mongodb';

type UpdateQueryBusiness =
  | UpdateQuery<
      Partial<
        Pick<
          Business,
          | 'hidden'
          | 'socialLinks'
          | 'bannerImages'
          | 'name'
          | 'routeName'
          | 'logo'
          | 'layouts'
          | 'postCategories'
          | 'aboutUsPage'
          | 'aboutUsPage'
          | 'telegramBotChat'
        >
      >
    >
  | UpdateWithAggregationPipeline;

interface GetAllArgs {
  paginateOptions?: PaginateOptions;
  createdBy?: string;
  routeNames?: Array<string>;
  search?: string;
  hidden?: boolean;
}

const getAllWithPagination: QueryHandle<GetAllArgs, PaginateResult<Business>> = async (query) => {
  const { paginateOptions = {}, createdBy, routeNames, search, hidden } = query;
  const filterQuery: FilterQuery<Business> = {};

  ///////////////////////////////////////////////////////////////////
  if (createdBy) {
    filterQuery.createdBy = createdBy;
  }
  ///////////////////////////////////////////////////////////////////

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }
  ///////////////////////////////////////////////////////////////////

  if (search) {
    filterQuery.name = { $regex: new RegExp(search), $options: 'i' };
  }
  ///////////////////////////////////////////////////////////////////

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }
  ///////////////////////////////////////////////////////////////////

  const out = await BusinessModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Business>;
};

const getAll: QueryHandle<Omit<GetAllArgs, 'paginateOptions'>, Array<Business>> = async (args) => {
  const out = await getAllWithPagination({
    ...args,
    paginateOptions: {
      pagination: false,
      customLabels: paginationCustomLabels,
    },
  });

  return out.data;
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
