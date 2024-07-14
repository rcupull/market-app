import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useShoppingMakeOrder = (): {
  shoppingMakeOrder: FetchResource<{ shoppingId: string; deliveryEnabled?: boolean }, void>;
} => {
  const fetch = useFetch();

  return {
    shoppingMakeOrder: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ shoppingId, deliveryEnabled }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/shopping/:shoppingId/makeOrder',
              urlParams: { shoppingId },
            }),
            data: { deliveryEnabled },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
