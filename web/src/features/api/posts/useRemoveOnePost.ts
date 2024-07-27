import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOnePost = (): {
  removeOnePost: FetchResource<{ id: string }, void>;
} => {
  const fetch = useFetch();

  const { user } = useAuth();

  const userId = user?._id || '<unknow user>';

  return {
    removeOnePost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ id }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/posts/:id',
              urlParams: { id, userId },
            }),
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
