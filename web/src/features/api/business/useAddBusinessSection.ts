import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PostsLayoutSectionPayload } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useAddBusinessSection = (): {
  addBusinessSection: FetchResource<{
    routeName: string;
    data: PostsLayoutSectionPayload;
  }>;
} => {
  const fetch = useFetch();

  return {
    addBusinessSection: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, data }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/business/:routeName/sections',
              urlParams: { routeName },
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
