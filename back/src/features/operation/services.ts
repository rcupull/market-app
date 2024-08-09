import { ModelDocument, QueryHandle } from '../../types/general';
import { FilterQuery, PaginateOptions, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { PaginateResult } from '../../middlewares/middlewarePagination';
import { getSortQuery } from '../../utils/schemas';
import { Operation } from '../../types/operation';
import { OperationModel } from '../../schemas/operation';

export const operationServicesAddOne: QueryHandle<
  Pick<Operation, 'type'>,
  ModelDocument<Operation>
> = async (args) => {
  const newOperation = new OperationModel(args);

  await newOperation.save();

  return newOperation;
};

export const operationServicesGetAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: FilterQuery<Operation>;
    sort?: string;
  },
  PaginateResult<Operation>
> = async ({ query, sort, paginateOptions = {} }) => {
  const out = await OperationModel.paginate(query, {
    ...paginateOptions,
    sort: getSortQuery(sort)
  });

  return out as unknown as PaginateResult<Operation>;
};

export const operationServicesUpdateOne: QueryHandle<
  {
    query: FilterQuery<Operation>;
    update: UpdateQuery<Operation>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await OperationModel.updateOne(query, update, options);
};
