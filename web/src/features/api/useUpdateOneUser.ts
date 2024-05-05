import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { User } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useUpdateOneUser = (): {
  updateOneUser: FetchResource<
    { userId: string; update: Partial<Pick<User, 'profileImage' | 'name'>> },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateOneUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId',
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
