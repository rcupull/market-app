import { useAuthSignIn } from 'features/api/auth/useAuthSignIn';
import { useGetOneUser } from 'features/api/user/useGetOneUser';
import { usePersistentContext } from 'features/persistent/usePersistentContext';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { Access } from 'types/admin';
import { FetchResource } from 'types/api';
import { AuthData, UserDto } from 'types/auth';
import { wait } from 'utils/general';

type UseAuthMeta = {
  authSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  user: UserDto | undefined;
  getIsSimpleUser: (user: UserDto | undefined) => boolean;
  getIsDeliveryUser: (user: UserDto | undefined) => boolean;
  getIsBusinessUser: (user: UserDto | undefined) => boolean;
  getIsAdmin: (user: UserDto | undefined) => boolean;
  getIsPaymentClient: (user: UserDto | undefined) => boolean;
  isAuthenticated: boolean;
  onRefreshAuthUser: () => void;
  getHasSomeAccess: (...access: Array<Access>) => boolean;
};

export type UserAuthReturn = ReturnType<typeof useAuthSignIn> & UseAuthMeta;

export const useAuth = (): UserAuthReturn => {
  const { authSignIn } = useAuthSignIn();

  const { data, setDataRedux, status, fetch, reset } = useApiPersistent('useAuth', authSignIn);

  const { removePersistent, setPersistent } = usePersistentContext();

  const { getOneUser } = useGetOneUser();

  const user = data?.user;

  const getIsAdmin: UseAuthMeta['getIsAdmin'] = (user) => {
    return user?.role === 'admin';
  };

  const getIsPaymentClient: UseAuthMeta['getIsPaymentClient'] = (user) => {
    return user?.role === 'paymentClient';
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
    getIsPaymentClient,
    getHasSomeAccess: (...access) => {
      const { specialAccess } = user || {};

      const hasAccess = access.map((val) => specialAccess?.includes(val)).some(Boolean);

      return hasAccess || !!specialAccess?.includes('full');
    },
    onRefreshAuthUser: () => {
      if (!data) return;

      const userId = data?.user._id;

      getOneUser.fetch(
        {
          userId
        },
        {
          onAfterSuccess: (user) => {
            setPersistent('user', user);
            setDataRedux({
              ...data,
              user
            });
          }
        }
      );
    },
    isAuthenticated: !!user,
    user,
    getIsAdmin,
    authSignIn: {
      data,
      status,
      fetch: ({ email, password }, options = {}) => {
        fetch(
          {
            email,
            password
          },
          {
            ...options,
            onAfterSuccess: async (response) => {
              const { accessToken, user, refreshToken } = response;

              setPersistent('accessToken', accessToken);
              setPersistent('accessTokenUpdatedAt', new Date().toISOString());
              setPersistent('refreshToken', refreshToken);
              setPersistent('user', user);

              await wait(100);
              options?.onAfterSuccess?.(response);
            }
          }
        );
      },
      reset: () => {
        removePersistent('accessToken');
        removePersistent('accessTokenUpdatedAt');
        removePersistent('refreshToken');
        removePersistent('user');
        reset();
      }
    }
  };
};
