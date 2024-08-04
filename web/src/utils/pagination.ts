import { FetchData, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';

export const getPaginationResources = <D extends AnyRecord = AnyRecord>(
  paginatedData: FetchData<PaginatedData<D>>
): {
  data: PaginatedData<D>['data'] | null;
  paginator: PaginatedData<D>['paginator'] | null;
} => {
  return {
    data: paginatedData?.data || null,
    paginator: paginatedData?.paginator || null
  };
};
