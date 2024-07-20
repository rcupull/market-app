import { useAuthSignIn } from 'features/api/auth/useAuthSignIn';
import { useGetOneUser } from 'features/api/user/useGetOneUser';
import { useCookies } from 'features/cookies/useCookies';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { Access } from 'types/admin';
import { FetchResource } from 'types/api';
import { AuthData, UserDto } from 'types/auth';
import { wait } from 'utils/general';

type UseAuthMeta = {
  authData: AuthData | null;
  authSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  user: UserDto | undefined;
  getIsSimpleUser: (user: UserDto | undefined) => boolean;
  getIsDeliveryUser: (user: UserDto | undefined) => boolean;
  getIsBusinessUser: (user: UserDto | undefined) => boolean;
  getIsAdmin: (user: UserDto | undefined) => boolean;
  isAuthenticated: boolean;
  onRefreshAuthUser: () => void;
  getHasSomeAccess: (...access: Array<Access>) => boolean;
};

export const useAuth = (): ReturnType<typeof useAuthSignIn> & UseAuthMeta => {
  const { authSignIn } = useAuthSignIn();

  const { data, setDataRedux, status, fetch, reset } = useApiPersistent('useAuth', authSignIn);

  const { removeCookie, setCookie } = useCookies();

  const { getOneUser } = useGetOneUser();

  const authData = data;

  const getIsAdmin: UseAuthMeta['getIsAdmin'] = (user) => {
    return user?.role === 'admin';
  };

  const getIsBusinessUser: UseAuthMeta['getIsBusinessUser'] = (user) => {
    if (getIsAdmin(user)) return false;
    return !!user?.canCreateBusiness;
  };

  const getIsDeliveryUser: UseAuthMeta['getIsDeliveryUser'] = (user) => {
    if (getIsAdmin(user)) return false;
    return !!user?.canMakeDeliveries;
  };

  const getIsSimpleUser: UseAuthMeta['getIsSimpleUser'] = (user) => {
    if (getIsAdmin(user)) return false;
    if (getIsBusinessUser(user)) return false;
    if (getIsDeliveryUser(user)) return false;

    return true;
  };

  return {
    getIsDeliveryUser,
    getIsSimpleUser,
    getIsBusinessUser,
    getHasSomeAccess: (...access) => {
      const { specialAccess } = authData?.user || {};

      const hasAccess = access.map((val) => specialAccess?.includes(val)).some(Boolean);

      return hasAccess || !!specialAccess?.includes('full');
    },
    onRefreshAuthUser: () => {
      if (!authData) return;

      const userId = authData.user._id;

      getOneUser.fetch(
        {
          userId,
        },
        {
          onAfterSuccess: (user) => {
            setCookie('user', user);
            setDataRedux({
              ...authData,
              user,
            });
          },
        }
      );
    },
    isAuthenticated: !!authData,
    user: authData?.user,
    getIsAdmin,
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
              const { accessToken, user, refreshToken } = response;

              setCookie('accessToken', accessToken);
              setCookie('accessTokenUpdatedAt', new Date().toISOString());
              setCookie('refreshToken', refreshToken);
              setCookie('user', user);

              await wait(100);
              options?.onAfterSuccess?.(response);
            },
          }
        );
      },
      reset: () => {
        removeCookie('accessToken');
        removeCookie('accessTokenUpdatedAt');
        removeCookie('refreshToken');
        removeCookie('user');
        reset();
      },
    },
  };
};
