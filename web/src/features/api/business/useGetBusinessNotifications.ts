import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useGetBusinessNotifications = (): {
  getBusinessNotifications: FetchResource<
    {
      routeName: string;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    getBusinessNotifications: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/business/:routeName/notifications',
              urlParams: { routeName }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
