import { QueryHandle } from '../../types/general';
import { PaginateResult } from '../../middlewares/pagination';
import { Bill } from '../../types/billing';
import { BillingModel } from '../../schemas/billing';
import { GetAllBillsArgs, getAllBillFilterQuery } from './utils';

const getAllWithPagination: QueryHandle<GetAllBillsArgs, PaginateResult<Bill>> = async ({
  paginateOptions = {},
  ...omittedArgs
}) => {
  const filterQuery = getAllBillFilterQuery(omittedArgs);

  const out = await BillingModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Bill>;
};

const getAll: QueryHandle<Omit<GetAllBillsArgs, 'paginateOptions'>, Array<Bill>> = async (args) => {
  const filterQuery = getAllBillFilterQuery(args);

  const out = await BillingModel.find(filterQuery);

  return out;
};

const addOne: QueryHandle<
  Pick<Bill, 'routeName' | 'shoppingIds' | 'totalDebit' | 'state'>,
  Bill
> = async (data) => {
  const newbill = new BillingModel(data);

  await newbill.save();

  return newbill;
};

export const billingServices = {
  getAllWithPagination,
  getAll,
  addOne,
};
