import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, GetAllBillsQuery, PaginatedData } from 'types/api';
import { Bill } from 'types/billing';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllBills = (): {
  getAllBills: FetchResourceWithPagination<GetAllBillsQuery, Bill>;
} => {
  const fetch = useFetch<PaginatedData<Bill>>();

  return {
    getAllBills: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ routeName, states }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/bills',
              query: { routeName, states },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
