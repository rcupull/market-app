import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddOneBillAdmin = (): {
  addOneBillAdmin: FetchResource<{ routeName: string; shoppingIds: Array<string> }>;
} => {
  const fetch = useFetch();

  return {
    addOneBillAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, shoppingIds }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/admin/bills',
            }),
            data: { routeName, shoppingIds },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
