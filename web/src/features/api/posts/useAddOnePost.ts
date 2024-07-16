import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useAddOnePost = (): {
  addOnePost: FetchResource<
    Pick<
      Post,
      | 'routeName'
      | 'clothingSizes'
      | 'colors'
      | 'description'
      | 'details'
      | 'highlights'
      | 'name'
      | 'price'
      | 'images'
      | 'postCategoriesTags'
      | 'discount'
      | 'stockAmount'
      | 'postType'
      | 'postLink'
    >,
    Post
  >;
} => {
  const fetch = useFetch<Post>();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addOnePost: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/posts',
              urlParams: { userId },
            }),
            data,
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
