import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthForgotPasswordValidate = (): {
  authForgotPasswordValidate: FetchResource<
    { newPassword: string; code: string },
    { email: string }
  >;
} => {
  const fetch = useFetch();

  return {
    authForgotPasswordValidate: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/forgot-password-validate' }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
