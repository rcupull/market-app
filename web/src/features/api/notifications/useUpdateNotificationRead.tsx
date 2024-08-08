import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useUpdateNotificationRead = (): {
  updateNotificationRead: FetchResource<{ notificationId: string }, void>;
} => {
  const fetch = useFetch();

  return {
    updateNotificationRead: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ notificationId }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/notifications/:notificationId/read',
              urlParams: { notificationId }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
