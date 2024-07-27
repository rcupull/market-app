import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllShoppingQuery, PaginatedData } from 'types/api';
import { Shopping } from 'types/shopping';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetShoppingOwner = (): {
  getShoppingOwner: FetchResourceWithPagination<GetAllShoppingQuery, Shopping>;
} => {
  const fetch = useFetch<PaginatedData<Shopping>>();

  return {
    getShoppingOwner: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/shopping/owner',
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
