import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useNlpSearch = (): {
  nlpSearch: FetchResource<{
    search: string;
  }>;
} => {
  const fetch = useFetch();

  return {
    nlpSearch: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ search }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/nlp/search',
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
