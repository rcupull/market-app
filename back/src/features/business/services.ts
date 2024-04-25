import {
  FilterQuery,
  PaginateOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose";
import { QueryHandle } from "../../types/general";
import { Business, BusinessCategory } from "../../types/business";
import { BusinessModel } from "../../schemas/business";
import { postServices } from "../post/services";
import {
  PaginateResult,
  paginationCustomLabels,
} from "../../middlewares/pagination";
import { ServerResponse } from "http";
import { imagesServices } from "../images/services";
import { get400Response, get404Response } from "../../utils/server-response";
import { UpdateOptions } from "mongodb";

type UpdateQueryBusiness =
  | UpdateQuery<
      Partial<
        Pick<
          Business,
          | "hidden"
          | "socialLinks"
          | "bannerImages"
          | "name"
          | "routeName"
          | "logo"
          | "layouts"
          | "postCategories"
          | "aboutUsPage"
          | "aboutUsPage"
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

const getAll: QueryHandle<GetAllArgs, PaginateResult<Business>> = async (
  query
) => {
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
    filterQuery.name = { $regex: new RegExp(search), $options: "i" };
  }
  ///////////////////////////////////////////////////////////////////

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }
  ///////////////////////////////////////////////////////////////////

  const out = await BusinessModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Business>;
};

const getAllWithoutPagination: QueryHandle<
  Omit<GetAllArgs, "paginateOptions">,
  Array<Business>
> = async (args) => {
  const out = await getAll({
    ...args,
    paginateOptions: {
      pagination: false,
      customLabels: paginationCustomLabels,
    },
  });

  if (out instanceof ServerResponse) return out;

  return out.data;
};

const addOne: QueryHandle<
  {
    category: BusinessCategory;
    name: string;
    routeName: string;
    userId: string;
  },
  Business
> = async ({ category, userId, routeName, name, res }) => {
  const routeNameExists = await BusinessModel.findOne({ routeName });
  if (routeNameExists) {
    return get400Response({
      res,
      json: { message: "Route name already exists" },
    });
  }

  const out = new BusinessModel({
    category,
    createdBy: userId,
    name,
    routeName,
  });

  await out.save();

  return out;
};

const findOne: QueryHandle<
  {
    routeName: string;
    createdBy?: string;
  },
  Business
> = async ({ routeName, createdBy, res }) => {
  const filterQuery: FilterQuery<Business> = {
    routeName,
  };

  if (createdBy) {
    filterQuery.createdBy = createdBy;
  }

  const out = await BusinessModel.findOne(filterQuery);

  if (!out) {
    return get404Response({
      res,
      json: { message: "Business not found" },
    });
  }

  return out;
};

const deleteOne: QueryHandle<{
  routeName: string;
  userId: string;
}> = async ({ routeName, res, req, userId }) => {
  /**
   * Remove all business images
   */
  await imagesServices.deleteDir({
    res,
    req,
    userId,
    routeName,
  });

  await BusinessModel.deleteOne({
    routeName,
    createdBy: userId,
  });

  const out = await postServices.deleteMany({
    routeName,
    res,
    req,
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
  getAll,
  getAllWithoutPagination,
  addOne,
  findOne,
  deleteOne,
  updateOne,
  updateMany,
};
