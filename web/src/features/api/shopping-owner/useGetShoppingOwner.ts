import { useFetch } from 'hooks/useFetch';

import { FetchResource, GetAllShoppingQuery } from 'types/api';
import { Shopping } from 'types/shopping';
import { getEndpoint } from 'utils/api';

export const useGetShoppingOwner = (): {
  getShoppingOwner: FetchResource<GetAllShoppingQuery, Array<Shopping>>;
} => {
  const fetch = useFetch<Array<Shopping>>();

  return {
    getShoppingOwner: {
      data: fetch[0],
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/shopping/owner',
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
