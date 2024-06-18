import { useGetConfigAdmin } from 'features/api/admin/useGetConfigAdmin';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { AdminConfig } from 'types/admin';

export const useAdminConfig = (): {
  init: () => void;
  reset: () => void;
  data: AdminConfig | null;
} => {
  const { getConfigAdmin } = useGetConfigAdmin();

  const { data, fetch, reset } = useApiPersistent('useAdminConfig', getConfigAdmin);

  return {
    reset,
    data,
    init: () => {
      fetch();
    },
  };
};
