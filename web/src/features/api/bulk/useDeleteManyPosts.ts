import { useFetch } from 'hooks/useFetch';

import { FetchResource, GetAllPostsQuery } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useDeleteManyPosts = (): {
  deleteManyPosts: FetchResource<
    {
      routeName: string;
      ids?: Array<string>;
      query?: Pick<GetAllPostsQuery, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    deleteManyPosts: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, query, ids }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/posts/bulkActions/delete',
            }),
            data: {
              ids,
              query,
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
