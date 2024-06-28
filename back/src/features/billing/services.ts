import { ModelDocument, QueryHandle } from '../../types/general';
import { PaginateResult } from '../../middlewares/pagination';
import { Bill, BillState } from '../../types/billing';
import { BillingModel } from '../../schemas/billing';
import { GetAllBillsArgs, getAllBillFilterQuery } from './utils';
import { FilterQuery, PaginateOptions, ProjectionType, Schema, UpdateQuery } from 'mongoose';
import { Shopping } from '../../types/shopping';
import { includesId } from '../../utils/general';

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

const getAll: QueryHandle<
  { query: GetAllBillsArgs; projection?: ProjectionType<Bill> },
  Array<Bill>
> = async ({ query, projection }) => {
  const filterQuery = getAllBillFilterQuery(query);

  const out = await BillingModel.find(filterQuery, projection);

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

const findOneAndDelete: QueryHandle<
  {
    query: FilterQuery<Bill>;
  },
  ModelDocument<Bill> | null
> = async ({ query }) => {
  const out = await BillingModel.findOneAndDelete(query);
  return out;
};

const deleteOne: QueryHandle<{
  query: FilterQuery<Bill>;
}> = async ({ query }) => {
  await BillingModel.deleteOne(query);
};

const deleteMany: QueryHandle<{
  query: FilterQuery<Bill>;
}> = async ({ query }) => {
  await BillingModel.deleteMany(query);
};

const getOne: QueryHandle<
  {
    query: FilterQuery<Bill>;
  },
  ModelDocument<Bill> | null
> = async ({ query }) => {
  return await BillingModel.findOne(query);
};

const getBillDataFromShopping: QueryHandle<
  {
    query: GetAllBillsArgs;
  },
  {
    getAllShopingIds: () => Array<Schema.Types.ObjectId>;
    getOneShoppingBillData: (shopping: Shopping) => {
      billId: Schema.Types.ObjectId;
      billState: BillState;
    } | null;
  }
> = async ({ query }) => {
  const billsData: Array<Pick<Bill, '_id' | 'shoppingIds' | 'state'>> = await getAll({
    query,
    projection: {
      _id: 1,
      shoppingIds: 1,
      state: 1,
    },
  });

  return {
    getAllShopingIds: () => {
      return billsData.reduce((acc, billData) => {
        return billData.shoppingIds.reduce((acc2, shoppingId) => {
          return includesId(acc, shoppingId) ? acc2 : [...acc2, shoppingId];
        }, acc);
      }, [] as Array<Schema.Types.ObjectId>);
    },
    getOneShoppingBillData: (shopping) => {
      const bill = billsData.find((bill) => includesId(bill.shoppingIds, shopping._id));
      if (bill) {
        return {
          billId: bill._id,
          billState: bill.state,
        };
      }
      return null;
    },
  };
};

export const billingServices = {
  getAllWithPagination,
  getAll,
  addOne,
  getOne,
  updateOne,
  findOneAndDelete,
  deleteMany,
  deleteOne,
  //
  getBillDataFromShopping,
};
