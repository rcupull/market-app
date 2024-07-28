import { usePersistentContext } from 'features/persistent/usePersistentContext';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthSignOut = (): {
  authSignOut: FetchResource<void, void>;
} => {
  const { getPersistent } = usePersistentContext();
  const fetch = useFetch();

  return {
    authSignOut: {
      data: fetch[0],
      status: fetch[1],
      fetch: async (_, options) => {
        const refreshToken = await getPersistent('refreshToken');

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
