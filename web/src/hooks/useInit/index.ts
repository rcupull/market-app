import { useEffect } from 'react';

import { useAuthRefresh } from 'features/api/auth/useAuthRefresh';
import { useAuthSignOut } from 'features/api/auth/useAuthSignOut';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';
import { useCookies } from 'features/cookies/useCookies';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';
import { useInterval } from 'hooks/useInterval';
import { useRouter } from 'hooks/useRouter';

export const useInit = () => {
  const { isAuthenticated, onRefreshAuthUser } = useAuth();
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
    getAllUserBussinessRefresh();
    onRefreshAuthUser();
    adminConfig.init();
  };

  const reset = () => {
    allUserBusiness.reset();
    adminConfig.reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(init, 500);

      return reset;
    }
  }, [isAuthenticated]);

  ////////////////////////////////////////////////////////////////////////
  const { authRefresh } = useAuthRefresh();
  const refreshInterval = useInterval({ startCalling: true });
  const { authSignOut } = useAuthSignOut();
  const { setCookie } = useCookies();

  useEffect(() => {
    if (isAuthenticated) {
      refreshInterval(
        () => {
          authRefresh.fetch(undefined, {
            onAfterSuccess: ({ accessToken }) => {
              setCookie('accessToken', accessToken);
            },
            onAfterFailed: () => {
              authSignOut.fetch();
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
