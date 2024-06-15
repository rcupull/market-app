import { ModelDocument, QueryHandle } from '../../types/general';
import { PaginateResult } from '../../middlewares/pagination';
import { Bill } from '../../types/billing';
import { BillingModel } from '../../schemas/billing';
import { GetAllBillsArgs, getAllBillFilterQuery } from './utils';
import { FilterQuery, PaginateOptions, UpdateQuery } from 'mongoose';

const getAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllBillsArgs;
  },
  PaginateResult<Bill>
> = async ({ paginateOptions = {}, query }) => {
  const filterQuery = getAllBillFilterQuery(query);

  const out = await BillingModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Bill>;
};

const getAll: QueryHandle<{ query: GetAllBillsArgs }, Array<Bill>> = async ({ query }) => {
  const filterQuery = getAllBillFilterQuery(query);

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

const updateOne: QueryHandle<{
  query: FilterQuery<Bill>;
  update: UpdateQuery<Bill>;
}> = async ({ query, update }) => {
  await BillingModel.updateOne(query, update);
};

const getOne: QueryHandle<
  {
    query: FilterQuery<Bill>;
  },
  ModelDocument<Bill> | null
> = async ({ query }) => {
  return await BillingModel.findOne(query);
};

export const billingServices = {
  getAllWithPagination,
  getAll,
  addOne,
  getOne,
  updateOne,
};
