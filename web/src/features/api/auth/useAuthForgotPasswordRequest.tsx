import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthForgotPasswordRequest = (): {
  authForgotPasswordRequest: FetchResource<{ email: string }, void>;
} => {
  const fetch = useFetch();

  return {
    authForgotPasswordRequest: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/forgot-password-request' }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
