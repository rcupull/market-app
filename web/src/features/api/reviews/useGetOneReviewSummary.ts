import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { ReviewSummary } from 'types/reviews';
import { getEndpoint } from 'utils/api';

export const useGetOneReviewSummary = (): {
  getOneReviewSummary: FetchResource<{ routeName?: string; postId?: string }, ReviewSummary>;
} => {
  const fetch = useFetch<ReviewSummary>();

  return {
    getOneReviewSummary: {
      data: fetch[0],
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/reviews/summary',
              query,
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
