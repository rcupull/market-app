import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Shopping } from 'types/shopping';
import { getEndpoint } from 'utils/api';

export const useGetShopping = (): {
  getShopping: FetchResource<{ routeName: string }, Array<Shopping>>;
} => {
  const fetch = useFetch<Array<Shopping>>();

  return {
    getShopping: {
      data: fetch[0],
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
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
