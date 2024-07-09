import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthValidate = (): {
  authValidate: FetchResource<{ code: string }, { email: string }>;
} => {
  const fetch = useFetch();

  return {
    authValidate: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ code }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/validate' }),
            data: { code },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
