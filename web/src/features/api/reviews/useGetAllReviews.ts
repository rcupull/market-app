import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllReviewsQuery, PaginatedData } from 'types/api';
import { Review } from 'types/reviews';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllReviews = (): {
  getAllReviews: FetchResourceWithPagination<GetAllReviewsQuery, Review>;
} => {
  const fetch = useFetch<PaginatedData<Review>>();

  return {
    getAllReviews: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/reviews',
              query: { limit: defaultLimit, ...query },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
