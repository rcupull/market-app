import { useEffect, useState } from 'react';

import { useCookies } from 'features/cookies/useCookies';

import { useDebouncedValue } from 'hooks/useDebouncedValue';

import axios from 'axios';
import {
  ApiError,
  ApiStatus,
  FetchData,
  FetchMethod,
  FetchStatus,
  Headers,
  OnAfterFailed,
  OnAfterSuccess,
} from 'types/api';
import { wait } from 'utils/general';

export type FetchOptions<Data = any> = {
  onAfterSuccess?: OnAfterSuccess<Data>;
  onAfterFailed?: OnAfterFailed;
};

export type FetchFnReset = () => void;

interface FetchFnCallArgs {
  method: FetchMethod;
  url: string;
  data?: any;
  headers?: Headers;
}

export type FetchFnCall<Data = unknown> = (
  args?: FetchFnCallArgs | Array<FetchFnCallArgs>,
  options?: Omit<FetchOptions<Data>, 'fetchWhenMount'>,
) => void;
export type UseFetchReturn<Data = unknown> = [
  FetchData<Data>,
  FetchStatus,
  FetchFnCall<Data>,
  FetchFnReset,
];

export const useFetch = <Data = any>(): UseFetchReturn<Data> => {
  const [response, setResponse] = useState<FetchData<Data>>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<ApiStatus>('NOT_STARTED');
  const [wasCalled, setWasCalled] = useState<boolean>(false);
  const { getCookie } = useCookies();
  const debouncedStatus = useDebouncedValue<ApiStatus>(status, 100);

  useEffect(() => {
    if (debouncedStatus === 'SUCCESS') {
      setStatus('NOT_STARTED');
    }
  }, [debouncedStatus]);

  const handleReset = () => {
    setResponse(null);
    setError(null);
    setStatus('NOT_STARTED');
    setWasCalled(false);
  };

  const handleFetch: FetchFnCall<Data> = async (args, options) => {
    if (!args) throw new Error('Should set some fetch args');

    const { onAfterSuccess, onAfterFailed } = options || {};

    try {
      setStatus('BUSY');

      const resourcesArray = args instanceof Array ? args : [args];

      const accessToken = getCookie('accessToken') as string | null;

      const promises = resourcesArray.map(({ method, url, data, headers = {} }) => {
        return axios({
          url,
          method,
          data,
          headers: {
            ...headers,
            Authorization: accessToken && `Bearer ${accessToken}`,
          },
        });
      });

      const responseArray = await Promise.all(promises);

      if (DEVELOPMENT) {
        //simulate the api call delay
        await wait(1000);
      }

      const response = (
        args instanceof Array ? responseArray.map(({ data }) => data) : responseArray[0].data
      ) as Data;

      setResponse(response);
      onAfterSuccess?.(response);
      setStatus('SUCCESS');
      setWasCalled(true);
    } catch (e) {
      onAfterFailed?.(e as ApiError);
      setResponse(null);
      setError(e as ApiError);
      setStatus('FAILED');
      setWasCalled(true);
    }
  };

  return [
    response,
    {
      isNotStarted: status === 'NOT_STARTED',
      isBusy: status === 'BUSY',
      isFailed: status === 'FAILED',
      isSuccess: status === 'SUCCESS',
      error,
      wasCalled,
    },
    handleFetch,
    handleReset,
  ];
};
