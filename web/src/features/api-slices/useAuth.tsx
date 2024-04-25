import { useAuthSignIn } from 'features/api/auth/useAuthSignIn';
import { useGetOneUser } from 'features/api/useGetOneUser';
import { useCookies } from 'features/cookies/useCookies';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchResource } from 'types/api';
import { AuthData } from 'types/auth';
import { wait } from 'utils/general';

export const useAuth = (): ReturnType<typeof useAuthSignIn> & {
  authData: AuthData | null;
  authSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  isAdmin: boolean;
  isUser: boolean;
  isBasicUser: boolean;
  isAuthenticated: boolean;
  onRefreshAuthUser: () => void;
} => {
  const { authSignIn } = useAuthSignIn();

  const { data, setDataRedux, status, fetch, reset } = useApiPersistent('useAuth', authSignIn);

  const { removeCookie, setCookie } = useCookies();

  const { getOneUser } = useGetOneUser();

  const authData = data;

  return {
    onRefreshAuthUser: () => {
      if (!authData) return;

      const userId = authData.user._id;

      getOneUser.fetch(
        {
          userId,
        },
        {
          onAfterSuccess: (user) => {
            const { token } = authData || {};

            setCookie('user', user);
            setDataRedux({
              token,
              user,
            });
          },
        },
      );
    },
    isAuthenticated: !!authData,
    isAdmin: authData?.user?.role === 'admin',
    isUser: authData?.user?.role === 'user' && authData?.user?.canCreateBusiness,
    isBasicUser: authData?.user?.role === 'user' && !authData?.user?.canCreateBusiness,
    authData,
    authSignIn: {
      data: authData,
      status,
      fetch: ({ email, password }, options = {}) => {
        fetch(
          {
            email,
            password,
          },
          {
            ...options,
            onAfterSuccess: async (response) => {
              const { token, user } = response;
              setCookie('token', token);
              setCookie('user', user);
              await wait(100);
              options?.onAfterSuccess?.(response);
            },
          },
        );
      },
      reset: () => {
        removeCookie('token');
        removeCookie('user');
        reset();
      },
    },
  };
};
