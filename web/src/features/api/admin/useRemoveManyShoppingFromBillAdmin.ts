import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveManyShoppingFromBillAdmin = (): {
  removeManyShoppingFromBillAdmin: FetchResource<{ shoppingIds: Array<string>; billId: string }>;
} => {
  const fetch = useFetch();

  return {
    removeManyShoppingFromBillAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ billId, shoppingIds }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/admin/bills/:billId/shopping',
              urlParams: { billId }
            }),
            data: { shoppingIds }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
