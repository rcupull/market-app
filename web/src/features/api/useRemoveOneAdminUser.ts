import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneAdminUser = (): {
  removeOneAdminUser: FetchResource<{ id: string }>;
} => {
  const fetch = useFetch();

  return {
    removeOneAdminUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ id }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/admin/users/:id',
              urlParams: { id },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
