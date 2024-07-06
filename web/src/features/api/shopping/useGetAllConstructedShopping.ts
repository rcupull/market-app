import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Shopping, ShoppingState } from 'types/shopping';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';



export const useGetAllConstructedShopping = (): {
  getAllConstructedShopping: FetchResourceWithPagination<{ routeName: string, state_ne: ShoppingState }, Shopping>;
} => {
  const fetch = useFetch<PaginatedData<Shopping>>();

  return {
    getAllConstructedShopping: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/shopping',
              query,
            }),
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
