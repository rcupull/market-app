import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlan, PaymentPlanType } from 'types/payment';
import { getEndpoint } from 'utils/api';

export const useGetOnePaymentPlan = (): {
  getOnePaymentPlan: FetchResource<{ type: PaymentPlanType }, PaymentPlan>;
} => {
  const fetch = useFetch<PaymentPlan>();

  return {
    getOnePaymentPlan: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ type }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/paymentPlans/:type',
              urlParams: {
                type,
              },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
