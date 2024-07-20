import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useUpdateTelegramChatBotUser = (): {
  updateTelegramChatBotUser: FetchResource<
    {
      userId: string;
      code: string;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateTelegramChatBotUser: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ userId, code }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/users/:userId/chatbotValidate',
              urlParams: { userId },
            }),
            data: {
              code,
            },
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
