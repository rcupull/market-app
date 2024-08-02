import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneDeliveryManFromBusines = (): {
  removeOneDeliveryManFromBusines: FetchResource<{ userId: string; routeName: string }, void>;
} => {
  const fetch = useFetch();

  return {
    removeOneDeliveryManFromBusines: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/users/:userId/deliveryBusiness',
              urlParams: { userId },
            }),
            data: {
              routeName,
            },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
