import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllShoppingAdminQuery, PaginatedData } from 'types/api';
import { Shopping } from 'types/shopping';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllShoppingAdmin = (): {
  getAllShoppingAdmin: FetchResourceWithPagination<GetAllShoppingAdminQuery, Shopping>;
} => {
  const fetch = useFetch<PaginatedData<Shopping>>();

  return {
    getAllShoppingAdmin: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/shopping',
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
