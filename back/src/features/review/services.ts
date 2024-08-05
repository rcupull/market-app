import { PaginateOptions, ProjectionType, QueryOptions } from 'mongoose';
import { ModelDocument, QueryHandle } from '../../types/general';
import { PaginateResult } from '../../middlewares/middlewarePagination';

import { getSortQuery } from '../../utils/schemas';
import { getAllFilterQuery, GetAllReviewArgs } from './utils';
import { ReviewModel } from '../../schemas/review';
import { Review } from '../../types/reviews';

export const reviewServicesGetAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllReviewArgs;
    sort?: string;
  },
  PaginateResult<Review>
> = async ({ paginateOptions = {}, query, sort }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await ReviewModel.paginate(filterQuery, {
    ...paginateOptions,
    sort: getSortQuery(sort)
  });

  return out as unknown as PaginateResult<Review>;
};

export const reviewServicesGetAll: QueryHandle<
  { query: GetAllReviewArgs; projection?: ProjectionType<Review>; options?: QueryOptions },
  Array<Review>
> = async ({ query, projection, options }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await ReviewModel.find(filterQuery, projection, options);

  return out;
};

export const reviewServicesAddOne: QueryHandle<
  Pick<Review, 'comment' | 'reviewerId' | 'star' | 'type' | 'reviewed'>,
  ModelDocument<Review>
> = async (args) => {
  const response = new ReviewModel(args);

  await response.save();

  return response;
};
