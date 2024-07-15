import { FilterQuery } from 'mongoose';
import { getFlattenUndefinedJson } from '../../utils/general';
import { Review } from '../../types/reviews';

export interface GetAllReviewArgs extends FilterQuery<Review> {}
export const getAllFilterQuery = ({ ...omittedQuery }: GetAllReviewArgs): FilterQuery<Review> => {
  const filterQuery: FilterQuery<Review> = omittedQuery;

  return getFlattenUndefinedJson(filterQuery);
};
