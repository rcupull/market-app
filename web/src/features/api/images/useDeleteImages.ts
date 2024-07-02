import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useDeleteImages = (): {
  deleteImages: FetchResource<{ srcs: Array<string> }>;
} => {
  const fetch = useFetch();

  return {
    deleteImages: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ srcs }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/images',
            }),
            data: { srcs },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
