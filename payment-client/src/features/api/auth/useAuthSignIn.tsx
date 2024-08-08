import { usePlatform } from 'hooks/useCapacitor';
import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { AuthDataDto, TYPE_DEVICE } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useAuthSignIn = (): {
  authSignIn: FetchResource<{ email: string; password: string }, AuthDataDto>;
} => {
  const fetch = useFetch<AuthDataDto>();

  const { isNative } = usePlatform();
  const typeDevice = isNative ? TYPE_DEVICE.NATIVE : TYPE_DEVICE.WEB;

  return {
    authSignIn: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ email: username, password }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-in' }),
            data: { username, password, typeDevice }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
