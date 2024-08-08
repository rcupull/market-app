import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Shopping } from 'types/shopping';
import { getEndpoint } from 'utils/api';

export const useGetOneShopping = (): {
  getOneShopping: FetchResource<{ shoppingId: string }, Shopping>;
} => {
  const fetch = useFetch<Shopping>();

  return {
    getOneShopping: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ shoppingId }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/shopping/:shoppingId',
              urlParams: { shoppingId }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
