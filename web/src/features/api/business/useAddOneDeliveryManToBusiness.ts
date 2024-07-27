import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddOneDeliveryManToBusiness = (): {
  addOneDeliveryManToBusiness: FetchResource<{ userId: string; routeName: string }, void>;
} => {
  const fetch = useFetch();

  return {
    addOneDeliveryManToBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/users/:userId/deliveryBusiness',
              urlParams: { userId },
            }),
            data: {
              routeName,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
