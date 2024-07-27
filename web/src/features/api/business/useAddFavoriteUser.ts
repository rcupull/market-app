import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddFavoriteUser = (): {
  addFavoriteUser: FetchResource<{ userId: string; routeName: string }, void>;
} => {
  const fetch = useFetch();

  return {
    addFavoriteUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/business/:routeName/favoriteUsers',
              urlParams: { routeName },
            }),
            data: {
              userId,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
