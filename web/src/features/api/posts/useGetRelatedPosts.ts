import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetRelatedPosts = (): {
  getRelatedPosts: FetchResourceWithPagination<{ id: string }, Post>;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  return {
    getRelatedPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ id }) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts/:id/related',
              urlParams: {
                id,
              },
            }),
          },
        );
      },
      reset: fetch[3],
    },
  };
};