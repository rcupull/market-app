import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { User } from 'types/auth';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllUsersAdmin = (): {
  getAllUsersAdmin: FetchResourceWithPagination<undefined, User>;
} => {
  const fetch = useFetch<PaginatedData<User>>();

  return {
    getAllUsersAdmin: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/users',
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
