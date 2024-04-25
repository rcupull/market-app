import { useAuth } from 'features/api-slices/useAuth';
import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlan } from 'types/payment';
import { getEndpoint } from 'utils/api';
import { isNumber } from 'utils/general';

export const useGetUserPaymentPlan = (): {
  getUserPaymentPlan: FetchResource<undefined, PaymentPlan>;
  userPlan: PaymentPlan | null;
  isNotValidBussinessCountByUser: (businessCount: number | undefined) => boolean;
  isNotValidPostsCountByBussines: (businessCount: number | undefined) => boolean;
} => {
  const fetchBase = useFetch<PaymentPlan>();
  const fetch = useApiSlice<PaymentPlan>(fetchBase, 'useGetUserPaymentPlan');

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  const [userPlan] = fetch;

  return {
    userPlan,
    isNotValidBussinessCountByUser: (value) => {
      const { maxBussinessByUser } = userPlan || {};
      return isNumber(value) && isNumber(maxBussinessByUser) && value >= maxBussinessByUser;
    },
    isNotValidPostsCountByBussines: (value) => {
      const { maxPostsByBussiness } = userPlan || {};
      return isNumber(value) && isNumber(maxPostsByBussiness) && value >= maxPostsByBussiness;
    },
    getUserPaymentPlan: {
      data: userPlan,
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/payment/plan',
              urlParams: { userId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
