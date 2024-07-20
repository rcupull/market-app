import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateOneBusinessAdmin = (): {
  updateOneBusinessAdmin: FetchResource<
    {
      routeName: string;
      update: Partial<Pick<Business, 'hidden'>>;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateOneBusinessAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/admin/business/:routeName',
              urlParams: { routeName },
            }),
            data: update,
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
