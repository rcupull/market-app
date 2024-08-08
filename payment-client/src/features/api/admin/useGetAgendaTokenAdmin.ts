import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useGetAgendaTokenAdmin = (): {
  getAgendaTokenAdmin: FetchResource<void, { agendaToken: string }>;
} => {
  const fetch = useFetch<{ agendaToken: string }>();

  return {
    getAgendaTokenAdmin: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/agenda/token'
            }),
            data
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
