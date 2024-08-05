import { QueryHandle } from '../../types/general';
import { PaginateOptions } from 'mongoose';

import { getSortQuery } from '../../utils/schemas';
import { GetAllDeliveryArgs, getAllDeliveryFilterQuery } from './utils';
import { DeliveryModel } from '../../schemas/delivery';
import { Delivery } from '../../types/delivery';
import { PaginateResult } from '../../middlewares/middlewarePagination';

export const deliveryServicesGetAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllDeliveryArgs;
    sort?: string;
  },
  PaginateResult<Delivery>
> = async ({ query, sort, paginateOptions = {} }) => {
  const filterQuery = getAllDeliveryFilterQuery(query);

  const out = await DeliveryModel.paginate(filterQuery, {
    ...paginateOptions,
    sort: getSortQuery(sort)
  });

  return out as unknown as PaginateResult<Delivery>;
};
