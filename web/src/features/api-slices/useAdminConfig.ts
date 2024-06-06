import { useGetAdminConfig } from 'features/api/admin/useGetAdminConfig';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { AdminConfig } from 'types/admin';

export const useAdminConfig = (): {
  init: () => void;
  reset: () => void;
  data: AdminConfig | null;
} => {
  const { getAdminConfig } = useGetAdminConfig();

  const { data, fetch, reset } = useApiPersistent('useAdminConfig', getAdminConfig);

  return {
    reset,
    data,
    init: () => {
      fetch();
    },
  };
};
