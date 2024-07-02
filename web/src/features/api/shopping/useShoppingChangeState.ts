import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { ShoppingState } from 'types/shopping';
import { getEndpoint } from 'utils/api';

export const useShoppingChangeState = (): {
  shoppingChangeState: FetchResource<{ shoppingId: string; state: ShoppingState }, void>;
} => {
  const fetch = useFetch();

  return {
    shoppingChangeState: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ shoppingId, state }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/shopping/:shoppingId/changeState',
              urlParams: { shoppingId },
            }),
            data: {
              state,
            },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
