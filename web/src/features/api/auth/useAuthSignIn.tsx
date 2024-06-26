import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { AuthDataDto } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useAuthSignIn = (): {
  authSignIn: FetchResource<{ email: string; password: string }, AuthDataDto>;
} => {
  const fetch = useFetch<AuthDataDto>();

  return {
    authSignIn: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ email: username, password }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-in' }),
            data: { username, password },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
