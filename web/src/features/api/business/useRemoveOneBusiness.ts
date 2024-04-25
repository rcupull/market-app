import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneBusiness = (): {
  removeOneBusiness: FetchResource<{ routeName: string }, void>;
} => {
  const fetch = useFetch();

  return {
    removeOneBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/business/:routeName',
              urlParams: { routeName },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
