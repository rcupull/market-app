import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useMakeReviewPost = (): {
  makeReviewPost: FetchResource<{ postId: string; value: number }>;
} => {
  const fetch = useFetch<Post>();

  return {
    makeReviewPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ postId, value }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/posts/:postId/review',
              urlParams: { postId },
            }),
            data: {
              value,
            },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
