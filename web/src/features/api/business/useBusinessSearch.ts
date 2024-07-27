import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useBusinessSearch = (): {
  businessSearch: FetchResource<{
    search: string;
  }>;
} => {
  const fetch = useFetch();

  return {
    businessSearch: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ search }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/business/search',
              query: { search },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
