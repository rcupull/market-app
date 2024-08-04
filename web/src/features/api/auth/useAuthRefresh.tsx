import { usePersistentContext } from 'features/persistent/usePersistentContext';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthRefresh = (): {
  authRefresh: FetchResource<void, { accessToken: string }>;
} => {
  const fetch = useFetch<{ accessToken: string }>();
  const { getPersistent } = usePersistentContext();

  return {
    authRefresh: {
      data: fetch[0],
      status: fetch[1],
      fetch: async (_, options = {}) => {
        const refreshToken = await getPersistent('refreshToken');

        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/refresh' }),
            data: { refreshToken }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
