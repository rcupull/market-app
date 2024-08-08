import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination } from 'types/api';
import { PushNotification } from 'types/notifications';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetUserNotifications = (): {
  getUserNotifications: FetchResourceWithPagination<
    { userId: string; onlyUnread?: boolean },
    PushNotification
  >;
} => {
  const fetch = useFetch();

  return {
    getUserNotifications: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ userId, onlyUnread }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/users/:userId/notifications',
              urlParams: { userId },
              query: { onlyUnread }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
