import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useBusinessChatBotValidate = (): {
  businessChatBotValidate: FetchResource<
    {
      routeName: string;
      code: string;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    businessChatBotValidate: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, code }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/business/:routeName/chatbotValidate',
              urlParams: { routeName }
            }),
            data: {
              code
            }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
