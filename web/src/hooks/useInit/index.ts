import { useEffect } from 'react';

import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';
import { useRouter } from 'hooks/useRouter';

export const useInit = () => {
  const { isAuthenticated, onRefreshAuthUser } = useAuth();
  const { pushRoute } = useRouter();
  //
  const { getUserPaymentPlan } = useGetUserPaymentPlan();
  const allUserBusiness = useAllUserBusiness();

  const debouncer = useDebouncer();

  const getUserPaymentPlanRefresh = () => getUserPaymentPlan.fetch(undefined);
  const getAllUserBussinessRefresh = () => allUserBusiness.init();

  useCallFromAfar(callAfarIds.getUserPaymentPlan, getUserPaymentPlanRefresh);
  useCallFromAfar(callAfarIds.getAllUserBussiness, getAllUserBussinessRefresh);

  useCallFromAfar(callAfarIds.redirect_to_dashboard_business_routename, ({ routeName }) => {
    pushRoute(`/dashboard/business/${routeName}`, undefined, { timeout: 100 });
  });

  useCallFromAfar(callAfarIds.redirect_to_routename, ({ routeName }) => {
    pushRoute(`/${routeName}`, undefined, { timeout: 100 });
  });

  const init = () => {
    getUserPaymentPlanRefresh();
    getAllUserBussinessRefresh();
    onRefreshAuthUser();
  };

  const reset = () => {
    getUserPaymentPlan.reset();
    allUserBusiness.reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(init, 500);

      return reset;
    }
  }, [isAuthenticated]);
};
