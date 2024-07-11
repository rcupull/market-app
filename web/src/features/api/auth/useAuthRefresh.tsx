import { useCookies } from 'features/cookies/useCookies';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthRefresh = (): {
  authRefresh: FetchResource<void, { accessToken: string }>;
} => {
  const fetch = useFetch<{ accessToken: string }>();
  const { getCookie } = useCookies();

  return {
    authRefresh: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        const refreshToken = getCookie('refreshToken');

        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/refresh' }),
            data: { refreshToken },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
