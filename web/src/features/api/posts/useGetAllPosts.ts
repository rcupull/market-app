import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllPostsQuery, PaginatedData } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllPosts = (): {
  getAllPosts: FetchResourceWithPagination<GetAllPostsQuery, Post>;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  return {
    getAllPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts',
              query: { limit: defaultLimit, ...query },
            }),
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
