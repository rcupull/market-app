import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { UserPurchasedPlan } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useUpdateAdminUserPlan = (): {
  updateAdminUserPlan: FetchResource<{
    userId: string;
    planId: string;
    update: Pick<UserPurchasedPlan, 'status'>;
  }>;
} => {
  const fetch = useFetch();

  return {
    updateAdminUserPlan: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, planId, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/admin/users/:userId/plans/:planId',
              urlParams: { userId, planId },
            }),
            data: update,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
