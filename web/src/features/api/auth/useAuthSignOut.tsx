import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';

export const useAuthSignOut = (): {
  authSignOut: FetchResource;
} => {
  const { authSignIn } = useAuth();

  const fetch = useFetch();

  return {
    authSignOut: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options) => {
        authSignIn.reset();
        options?.onAfterSuccess?.(undefined);

        // fetch[2](
        //   {
        //     method: 'post',
        //     url: getEndpoint({ path: '/auth/sign-out' }),
        //     data: { token },
        //   },
        //   {
        //     ...options,
        //     onAfterSuccess: (response) => {
        //       authSignIn.reset();
        //       options?.onAfterSuccess?.(response);
        //     },
        //   },
        // );
      },
      reset: fetch[3],
    },
  };
};
