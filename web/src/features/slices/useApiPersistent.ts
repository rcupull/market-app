import { useEffect } from 'react';

import { useSimpleSlice } from './useSimpleSlice';

import type { FetchData, FetchResource, FetchStatus } from 'types/api';

interface ApiPersistent<Args = any, D = any> extends FetchResource<Args, D> {
  setDataRedux: (d: D) => void;
  resetDataRedux: () => void;
}

export const useApiPersistent = <Args = any, D = any>(
  field: string,
  resources: FetchResource<Args, D>,
): ApiPersistent<Args, D> => {
  const {
    data: reduxData,
    reset,
    setData,
  } = useSimpleSlice<{ data: FetchData<D>; status: FetchStatus } | null>(field);

  const status = reduxData?.status || resources.status;
  const data = reduxData?.data || null;

  const setDataRedux: ApiPersistent<Args, D>['setDataRedux'] = (d) => setData({ status, data: d });

  useEffect(() => {
    setData({ data, status: resources.status });
  }, [JSON.stringify(resources.status)]);

  return {
    status,
    data,
    fetch: (args, options = {}) => {
      resources.fetch(args, {
        ...options,
        onAfterSuccess: async (response) => {
          await options?.onAfterSuccess?.(response);

          setDataRedux(response);
        },
      });
    },
    reset: () => {
      reset();
      resources.reset();
    },
    setDataRedux,
    resetDataRedux: reset,
  };
};
