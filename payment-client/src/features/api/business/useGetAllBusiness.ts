import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllBusinessQuery, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllBusiness = (): {
  getAllBusiness: FetchResourceWithPagination<GetAllBusinessQuery, Business>;
} => {
  const fetch = useFetch<PaginatedData<Business>>();

  return {
    getAllBusiness: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({ path: '/business', query: { limit: defaultLimit, ...query } })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
