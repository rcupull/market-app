import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveBusinessSection = (): {
  removeBusinessSection: FetchResource<{
    routeName: string;
    sectionId: string;
  }>;
} => {
  const fetch = useFetch();

  return {
    removeBusinessSection: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, sectionId }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/business/:routeName/sections/:sectionId',
              urlParams: { routeName, sectionId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
