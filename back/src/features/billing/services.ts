import { FilterQuery, PaginateOptions } from 'mongoose';
import { QueryHandle } from '../../types/general';
import { PaginateResult } from '../../middlewares/pagination';
import { Bill, BillState } from '../../types/billing';
import { BillingModel } from '../../schemas/billing';

export interface GetAllArgs {
  paginateOptions?: PaginateOptions;
  states?: Array<BillState>;
}

const getAllWithPagination: QueryHandle<GetAllArgs, PaginateResult<Bill>> = async ({
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
  getAllWithPagination,
};
