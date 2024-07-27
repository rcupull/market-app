import { useSimpleSlice } from './useSimpleSlice';

import type { FetchResourceWithPagination } from 'types/api';
import { AnyRecord } from 'types/general';

export const useApiPersistentPaginated = <Args = any, D extends AnyRecord = AnyRecord>(
  field: string,
  resources: FetchResourceWithPagination<Args, D>,
): FetchResourceWithPagination<Args, D> => {
  const { data, reset, setData } = useSimpleSlice(field);

  return {
    ...resources,
    data,
    fetch: (args, options = {}) => {
      resources.fetch(args, {
        ...options,
        onAfterSuccess: (response) => {
          setData(response.data);
          options?.onAfterSuccess?.(response);
        },
      });
    },
    reset: () => {
      reset();
      resources.reset();
    },
  };
};
