import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAdminBDScript = (): {
  adminBDScript: FetchResource;
} => {
  const fetch = useFetch();

  return {
    adminBDScript: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/bd-script'
            }),
            data
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
