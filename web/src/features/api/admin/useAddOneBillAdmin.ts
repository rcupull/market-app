import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { ShoppingState } from 'types/shopping';
import { getEndpoint } from 'utils/api';

export const useAddOneBillAdmin = (): {
  addOneBillAdmin: FetchResource<{
    routeName: string;
    shoppingIds?: Array<string>;
    dateFrom?: string;
    dateTo?: string;
    states?: Array<ShoppingState>;
  }>;
} => {
  const fetch = useFetch();

  return {
    addOneBillAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/admin/bills',
            }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
