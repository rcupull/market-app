import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveFavoriteUser = (): {
  removeFavoriteUser: FetchResource<{ userId: string; routeName: string }, void>;
} => {
  const fetch = useFetch();

  return {
    removeFavoriteUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/business/:routeName/favoriteUsers',
              urlParams: { routeName }
            }),
            data: {
              userId
            }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
