import { useFetch } from 'hooks/useFetch';

import { Access, AdminConfig } from 'types/admin';
import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useUpdateUserAccessAdmin = (): {
  updateUserAccessAdmin: FetchResource<
    { userId: string; specialAccess: Array<Access> },
    AdminConfig
  >;
} => {
  const fetch = useFetch<AdminConfig>();

  return {
    updateUserAccessAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, specialAccess }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/admin/users/:userId/access',
              urlParams: { userId },
            }),
            data: {
              specialAccess,
            },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
