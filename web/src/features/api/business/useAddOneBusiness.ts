import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useAddOneBusiness = (): {
  addOneBusiness: FetchResource<{ name: string; routeName: string; category: string }, Business>;
} => {
  const fetch = useFetch<Business>();

  return {
    addOneBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ name, category, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/business',
            }),
            data: { name, category, routeName },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
