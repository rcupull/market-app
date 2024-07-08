import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllBusinessQuery, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

interface BusinessDto extends Business {
  userData: {
    name: string;
  };
  postCount: number;
}

export const useGetAllBusinessAdmin = (): {
  getAllBusinessAdmin: FetchResourceWithPagination<GetAllBusinessQuery, BusinessDto>;
} => {
  const fetch = useFetch<PaginatedData<BusinessDto>>();

  return {
    getAllBusinessAdmin: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({ path: '/admin/business', query: { limit: defaultLimit, ...query } }),
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
