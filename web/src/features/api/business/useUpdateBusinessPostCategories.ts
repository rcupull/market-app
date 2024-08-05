import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PostCategory } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateBusinessPostCategories = (): {
  updateBusinessPostCategories: FetchResource<
    { routeName: string; postCategories: Array<PostCategory> },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateBusinessPostCategories: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, postCategories }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/business/:routeName/postCategories',
              urlParams: { routeName }
            }),
            data: {
              postCategories
            }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
