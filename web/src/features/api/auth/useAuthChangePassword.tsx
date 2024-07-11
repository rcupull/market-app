import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthChangePassword = (): {
  authChangePassword: FetchResource<{ newPassword: string }, void>;
} => {
  const fetch = useFetch();

  return {
    authChangePassword: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ newPassword }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/change-password' }),
            data: { newPassword },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
