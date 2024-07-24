import { FilterQuery } from 'mongoose';
import { Delivery } from '../../types/delivery';

export interface GetAllDeliveryArgs extends FilterQuery<Delivery> {
  routeNames?: Array<string>;
}

export const getAllDeliveryFilterQuery = ({
  routeNames,
  ...omittedQuery
}: GetAllDeliveryArgs): FilterQuery<Delivery> => {
  const filterQuery: FilterQuery<Delivery> = omittedQuery;

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }

  return filterQuery;
};
