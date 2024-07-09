import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useDuplicateOnePost = (): {
  duplicateOnePost: FetchResource<{ postId: string }, Post>;
} => {
  const fetch = useFetch<Post>();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    duplicateOnePost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ postId }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/posts/:postId/duplicate',
              urlParams: { userId, postId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
