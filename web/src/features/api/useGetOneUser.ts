import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { User } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useGetOneUser = (): {
  getOneUser: FetchResource<{ userId: string }, User>;
} => {
  const fetch = useFetch<User>();

  return {
    getOneUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId',
              urlParams: {
                userId,
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
