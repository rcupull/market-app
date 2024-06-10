import { FilterQuery, PaginateOptions, Schema, UpdateQuery } from 'mongoose';
import { ModelDocument, QueryHandle } from '../../types/general';
import { PaginateResult } from '../../middlewares/pagination';
import { isNumber } from '../../utils/general';
import { Bill, BillState } from '../../types/billing';
import { BillingModel } from '../../schemas/billing';

export interface GetAllArgs {
  paginateOptions?: PaginateOptions;
  states?: Array<BillState>;
}

const getAll: QueryHandle<GetAllArgs, PaginateResult<Bill>> = async ({
  paginateOptions = {},
  states,
}) => {
  const filterQuery: FilterQuery<Bill> = {};

  ///////////////////////////////////////////////////////////////////

  if (states?.length) {
    filterQuery.state = { $in: states };
  }

  ///////////////////////////////////////////////////////////////////

  const out = await BillingModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Bill>;
};

export const billingServices = {
  getAll,
};