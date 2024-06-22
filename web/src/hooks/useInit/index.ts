import { useEffect } from 'react';

import { useAuthRefresh } from 'features/api/auth/useAuthRefresh';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';
import { useSignOut } from 'features/api-slices/useSignOut';
import { useCookies } from 'features/cookies/useCookies';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';
import { useInterval } from 'hooks/useInterval';
import { useRouter } from 'hooks/useRouter';

export const useInit = () => {
  const { isAuthenticated, onRefreshAuthUser, isUser } = useAuth();
  const { pushRoute } = useRouter();

  const allUserBusiness = useAllUserBusiness();
  const adminConfig = useAdminConfig();

  const debouncer = useDebouncer();

  const getAllUserBussinessRefresh = () => allUserBusiness.init();

  useCallFromAfar(callAfarIds.getAllUserBussiness, getAllUserBussinessRefresh);

  useCallFromAfar(callAfarIds.redirect_to_dashboard_business_routename, ({ routeName }) => {
    pushRoute(`/dashboard/business/${routeName}`, undefined, { timeout: 100 });
  });

  const init = () => {
    isUser && getAllUserBussinessRefresh();
    onRefreshAuthUser();
  };

  const reset = () => {
    allUserBusiness.reset();
  };

  useEffect(() => {
    adminConfig.init();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(init, 500);

      return reset;
    }
  }, [isAuthenticated]);

  ////////////////////////////////////////////////////////////////////////
  const { authRefresh } = useAuthRefresh();
  const refreshInterval = useInterval();
  const { signOut } = useSignOut();
  const { setCookie } = useCookies();

  useEffect(() => {
    if (isAuthenticated) {
      refreshInterval(
        () => {
          authRefresh.fetch(undefined, {
            onAfterSuccess: ({ accessToken }) => {
              setCookie('accessToken', accessToken);
              setCookie('accessTokenUpdatedAt', new Date().toISOString());
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
