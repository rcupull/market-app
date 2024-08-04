import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useGetOneBusiness = (): {
  getOneBusiness: FetchResource<{ routeName: string }, Business>;
} => {
  const fetch = useFetch<Business>();

  return {
    getOneBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/business/:routeName',
              urlParams: {
                routeName
              }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
