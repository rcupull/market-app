import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Review } from 'types/reviews';
import { getEndpoint } from 'utils/api';

export const useAddOneReview = (): {
  addOneReview: FetchResource<
    { star?: number; comment?: string; routeName?: string; postId?: string },
    Review
  >;
} => {
  const fetch = useFetch<Review>();

  return {
    addOneReview: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/reviews',
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
