import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { ShoppingDelivery } from 'types/shopping';
import { getEndpoint } from 'utils/api';

export const useShoppingMakeOrder = (): {
  shoppingMakeOrder: FetchResource<{ shoppingId: string; delivery?: ShoppingDelivery }, void>;
} => {
  const fetch = useFetch();

  return {
    shoppingMakeOrder: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ shoppingId, delivery }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/shopping/:shoppingId/makeOrder',
              urlParams: { shoppingId }
            }),
            data: { delivery }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
