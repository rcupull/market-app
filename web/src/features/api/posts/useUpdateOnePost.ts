import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateOnePost = (): {
  updateOnePost: FetchResource<
    { postId: string } & Partial<
      Pick<
        Post,
        | 'clothingSizes'
        | 'colors'
        | 'currency'
        | 'description'
        | 'details'
        | 'hidden'
        | 'highlights'
        | 'images'
        | 'price'
        | 'name'
        | 'reviews'
        | 'postCategoriesTags'
        | 'discount'
        | 'postPageLayout'
        | 'stockAmount'
      >
    >,
    void
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateOnePost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ postId, ...data }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/posts/:postId',
              urlParams: { postId, userId },
            }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
