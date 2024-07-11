import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveFavoriteBusinessFromUser = (): {
  removeFavoriteBusinessFromUser: FetchResource<{ userId: string; routeName: string }, void>;
} => {
  const fetch = useFetch();

  return {
    removeFavoriteBusinessFromUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/favoriteBusiness',
              urlParams: { userId },
            }),
            data: {
              routeName,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
