import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { BusinessChecks } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateChecksBusiness = (): {
  updateChecksBusiness: FetchResource<
    {
      routeName: string;
      update: BusinessChecks;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateChecksBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/business/:routeName/checks',
              urlParams: { routeName },
            }),
            data: update,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
