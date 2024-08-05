import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useBusinessSectionsReorder = (): {
  businessSectionsReorder: FetchResource<
    { routeName: string; fromIndex: number; toIndex: number },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    businessSectionsReorder: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, ...data }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/business/:routeName/sections/reorder',
              urlParams: { routeName }
            }),
            data
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
