import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlan, PaymentPlanType } from 'types/payment';
import { getEndpoint } from 'utils/api';

export const useGetAllPaymentPlans = (): {
  getAllPaymentPlans: FetchResource<void, Record<PaymentPlanType, PaymentPlan>>;
} => {
  const fetch = useFetch<Record<PaymentPlanType, PaymentPlan>>();

  return {
    getAllPaymentPlans: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/payment-plans',
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
