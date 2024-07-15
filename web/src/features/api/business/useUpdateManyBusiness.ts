import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateManyBusiness = (): {
  updateManyBussiness: FetchResource<
    Array<{ routeName: string } & Partial<Pick<Business, 'hidden'>>>,
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateManyBussiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: (args, options = {}) => {
        fetch[2](
          args.map(({ routeName, ...data }) => {
            return {
              method: 'put',
              url: getEndpoint({
                path: '/business/:routeName',
                urlParams: { routeName },
              }),
              data,
            };
          }),
          options
        );
      },
      reset: fetch[3],
    },
  };
};
