import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlanType } from 'types/payment';
import { getEndpoint } from 'utils/api';

export const useAddOnePaymentPlanPurchase = (): {
  addOnePaymentPlanPurchase: FetchResource<{
    planType: PaymentPlanType;
    validationPurchaseCode: string;
  }>;
} => {
  const fetch = useFetch();
  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addOnePaymentPlanPurchase: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ planType, validationPurchaseCode }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/payment/plan/purchase',
              urlParams: {
                userId,
              },
            }),
            data: {
              planType,
              validationPurchaseCode,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
