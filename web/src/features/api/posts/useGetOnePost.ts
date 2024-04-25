import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useGetOnePost = (): {
  getOnePost: FetchResource<{ id: string }, Post>;
} => {
  const fetch = useFetch<Post>();

  return {
    getOnePost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ id }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts/:id',
              urlParams: {
                id,
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
