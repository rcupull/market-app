import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { UserChecks } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useUpdateChecksUser = (): {
  updateChecksUser: FetchResource<
    {
      userId: string;
      update: UserChecks;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateChecksUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/users/:userId/checks',
              urlParams: { userId },
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
