import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetRelatedPosts = (): {
  getRelatedPosts: FetchResourceWithPagination<{ postId: string }, Post>;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  return {
    getRelatedPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ postId }) => {
        fetch[2]({
          method: 'get',
          url: getEndpoint({
            path: '/posts/:postId/related',
            urlParams: {
              postId,
            },
          }),
        });
      },
      reset: fetch[3],
    },
  };
};
