import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PostsLayoutSectionPayload } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateBusinessSection = (): {
  updateBusinessSection: FetchResource<{
    routeName: string;
    sectionId: string;
    data: Partial<PostsLayoutSectionPayload>;
  }>;
} => {
  const fetch = useFetch();

  return {
    updateBusinessSection: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, sectionId, data }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/business/:routeName/sections/:sectionId',
              urlParams: { routeName, sectionId },
            }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
