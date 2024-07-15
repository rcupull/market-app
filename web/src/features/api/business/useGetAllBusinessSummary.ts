import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllBusinessQuery, PaginatedData } from 'types/api';
import { BusinessSummary } from 'types/business';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllBusinessSummary = (): {
  getAllBusinessSummary: FetchResourceWithPagination<GetAllBusinessQuery, BusinessSummary>;
} => {
  const fetch = useFetch<PaginatedData<BusinessSummary>>();

  return {
    getAllBusinessSummary: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/business/summary',
              query: { limit: defaultLimit, ...query },
            }),
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
