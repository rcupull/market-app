import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllBillAdminQuery, PaginatedData } from 'types/api';
import { Bill } from 'types/billing';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllBillsAdmin = (): {
  getAllBillsAdmin: FetchResourceWithPagination<GetAllBillAdminQuery, Bill>;
} => {
  const fetch = useFetch<PaginatedData<Bill>>();

  return {
    getAllBillsAdmin: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/bills',
              query: { limit: defaultLimit, ...query },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
