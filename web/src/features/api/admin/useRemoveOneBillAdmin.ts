import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneBillAdmin = (): {
  removeOneBillAdmin: FetchResource<{ billId: string }>;
} => {
  const fetch = useFetch();

  return {
    removeOneBillAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ billId }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/admin/bills/:billId',
              urlParams: { billId }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
