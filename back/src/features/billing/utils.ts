import { Shopping } from '../../types/shopping';

import { FilterQuery } from 'mongoose';
import { Bill, BillState } from '../../types/billing';

export interface GetAllBillsArgs extends FilterQuery<Shopping> {
  states?: Array<BillState>;
  routeNames?: Array<string>;
}

export const getAllBillFilterQuery = (args: GetAllBillsArgs): FilterQuery<Shopping> => {
  const { routeNames, states, ...omittedQuery } = args;

  const filterQuery: FilterQuery<Bill> = omittedQuery;

  if (states?.length) {
    filterQuery.state = { $in: states };
  }

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }

  return filterQuery;
};
