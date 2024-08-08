import { useFetch } from 'hooks/useFetch';

import { FetchResource, GetAllPostsQuery } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateManyPosts = (): {
  updateManyPosts: FetchResource<
    {
      routeName: string;
      ids?: Array<string>;
      update: Pick<Post, 'hidden'>;
      query?: Pick<GetAllPostsQuery, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateManyPosts: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, ids, update, query }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/posts/bulkActions/update'
            }),
            data: {
              ids,
              query,
              update,
              routeName
            }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
