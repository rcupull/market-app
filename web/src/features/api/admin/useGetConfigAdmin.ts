import { useFetch } from 'hooks/useFetch';

import { AdminConfig } from 'types/admin';
import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useGetConfigAdmin = (): {
  getConfigAdmin: FetchResource<void, AdminConfig>;
} => {
  const fetch = useFetch<AdminConfig>();

  return {
    getConfigAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/admin-config',
            }),
            data,
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
