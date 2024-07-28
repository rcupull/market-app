import { useEffect } from 'react';

import { useAuthRefresh } from 'features/api/auth/useAuthRefresh';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';
import { useSignOut } from 'features/api-slices/useSignOut';
import { usePersistentContext } from 'features/persistent/usePersistentContext';

import { useDebouncer } from 'hooks/useDebouncer';
import { useInterval } from 'hooks/useInterval';

export const useInit = () => {
  const { isAuthenticated, onRefreshAuthUser, getIsBusinessUser, user } = useAuth();

  const { allUserBusiness } = useAllUserBusiness();
  const adminConfig = useAdminConfig();

  const debouncer = useDebouncer();

  const reset = () => {
    allUserBusiness.reset();
  };

  useEffect(() => {
    adminConfig.init();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(() => {
        if (getIsBusinessUser(user)) {
          allUserBusiness.refresh();
        }
        onRefreshAuthUser();
      }, 500);

      return reset;
    }
  }, [isAuthenticated]);

  ////////////////////////////////////////////////////////////////////////
  const { authRefresh } = useAuthRefresh();
  const refreshInterval = useInterval();
  const { signOut } = useSignOut();
  const { setPersistent } = usePersistentContext();

  useEffect(() => {
    if (isAuthenticated) {
      refreshInterval(
        () => {
          authRefresh.fetch(undefined, {
            onAfterSuccess: ({ accessToken }) => {
              setPersistent('accessToken', accessToken);
              setPersistent('accessTokenUpdatedAt', new Date().toISOString());
            },
            onAfterFailed: () => {
              signOut.fetch();
            },
          });
        },
        20 * 60 * 1000, //20min
      );
    } else {
      refreshInterval.cancel();
    }

    return refreshInterval.cancel;
  }, [isAuthenticated]);
};
