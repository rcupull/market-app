import { useFetch } from 'hooks/useFetch';

import { Access } from 'types/admin';
import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useGetSpecialAccess = (): {
  getSpecialAccess: FetchResource<void, { specialAccess: Array<Access> }>;
} => {
  const fetch = useFetch<{ specialAccess: Array<Access> }>();

  return {
    getSpecialAccess: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/access'
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
