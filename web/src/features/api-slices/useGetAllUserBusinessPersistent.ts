import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

import { useAuth } from './useAuth';

import { Business } from 'types/business';

export const useAllUserBusiness = (): {
  init: () => void;
  reset: () => void;
  data: Array<Business> | null;
} => {
  const { getAllBusiness } = useGetAllBusiness();

  const { data, fetch, reset } = useApiPersistentPaginated('useAllUserBusiness', getAllBusiness);
  const { authData } = useAuth();

  return {
    reset,
    data,
    init: () => {
      fetch({
        includeHidden: true,
        pagination: false,
        userId: authData?.user._id,
      });
    },
  };
};
