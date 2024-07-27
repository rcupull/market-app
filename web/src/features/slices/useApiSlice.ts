import type { UseFetchReturn } from 'hooks/useFetch';

import { useSimpleSlice } from './useSimpleSlice';

import type { FetchData } from 'types/api';

export const useApiSlice = <D = any, N extends string = string>(
  fetch: UseFetchReturn<D>,
  name: N,
): [
  ...UseFetchReturn<D>,
  {
    setDataRedux: (data: D) => void;
    resetDataRedux: () => void;
  },
] => {
  const [, status, handleCall, handleReset] = fetch;

  const { data, reset, setData } = useSimpleSlice<FetchData<D>, N>(name);

  return [
    data,
    status,
    (args, options = {}) => {
      handleCall(args, {
        ...options,
        onAfterSuccess: (res) => {
          setData(res);
          options?.onAfterSuccess?.(res);
        },
      });
    },
    () => {
      reset();
      handleReset();
    },
    {
      setDataRedux: setData,
      resetDataRedux: reset,
    },
  ];
};
