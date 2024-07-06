import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useNlpTrain = (): {
  nlpTrain: FetchResource;
} => {
  const fetch = useFetch();

  return {
    nlpTrain: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/nlp/train',
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
