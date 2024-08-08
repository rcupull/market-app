import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthUpdateFirebaseToken = (): {
  authUpdateFirebaseToken: FetchResource<{ firebaseToken: string }, void>;
} => {
  const fetch = useFetch();

  return {
    authUpdateFirebaseToken: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({ path: '/auth/firebase/token' }),
            data
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
