import { useFetch } from 'hooks/useFetch';

import { defaultLimit } from 'constants/api';
import { FetchResourceWithPagination, GetAllUserAdminQuery, PaginatedData } from 'types/api';
import { User } from 'types/auth';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllUsersAdmin = (): {
  getAllUsersAdmin: FetchResourceWithPagination<GetAllUserAdminQuery, User>;
} => {
  const fetch = useFetch<PaginatedData<User>>();

  return {
    getAllUsersAdmin: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/admin/users',
              query: { limit: defaultLimit, ...query }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
