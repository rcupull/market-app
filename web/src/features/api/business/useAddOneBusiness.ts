import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useAddOneBusiness = (): {
  addOneBusiness: FetchResource<
    Pick<Business, 'name' | 'routeName' | 'postCategories' | 'currency'>,
    Business
  >;
} => {
  const fetch = useFetch<Business>();

  return {
    addOneBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/business',
            }),
            data,
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
