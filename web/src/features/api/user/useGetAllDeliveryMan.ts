import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { User } from 'types/auth';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllDeliveryMan = (): {
  getAllDeliveryMan: FetchResourceWithPagination<void, User>;
} => {
  const fetch = useFetch<PaginatedData<User>>();

  return {
    getAllDeliveryMan: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/users/deliveryMan',
              query: { limit: defaultLimit }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
