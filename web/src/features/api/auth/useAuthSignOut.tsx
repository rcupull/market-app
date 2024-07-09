import { useCookies } from 'features/cookies/useCookies';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthSignOut = (): {
  authSignOut: FetchResource<void, void>;
} => {
  const { getCookie } = useCookies();
  const fetch = useFetch();

  return {
    authSignOut: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options) => {
        const refreshToken = getCookie('refreshToken');

        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-out' }),
            data: { refreshToken },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
