import { useEffect, useState } from 'react';

import { useCookies } from 'features/cookies/useCookies';

import { useDebouncedValue } from 'hooks/useDebouncedValue';

import axios, { AxiosError } from 'axios';
import { differenceInMinutes } from 'date-fns';
import {
  ApiError,
  ApiErrorReazon,
  ApiStatus,
  FetchData,
  FetchMethod,
  FetchStatus,
  Headers,
  OnAfterFailed,
  OnAfterSuccess,
} from 'types/api';
import { getEndpoint } from 'utils/api';
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
  options?: Omit<FetchOptions<Data>, 'fetchWhenMount'>
) => void;
export type UseFetchReturn<Data = unknown> = [
  FetchData<Data>,
  FetchStatus,
  FetchFnCall<Data>,
  FetchFnReset
];

let fetchingTokenPromise: Promise<any> | null = null;

const isOutOfDateToken = (accessTokenUpdatedAt: string) => {
  const diff = differenceInMinutes(new Date(), new Date(accessTokenUpdatedAt));

  return diff > 20;
};
export const useFetch = <Data = any>(): UseFetchReturn<Data> => {
  const [response, setResponse] = useState<FetchData<Data>>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<ApiStatus>('NOT_STARTED');
  const [wasCalled, setWasCalled] = useState<boolean>(false);
  const { getCookie, setCookie } = useCookies();
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

    const handleFetchAccessToken = async () => {
      if (fetchingTokenPromise) {
        return fetchingTokenPromise;
      }

      fetchingTokenPromise = new Promise((resolve, reject) => {
        const refreshToken = getCookie('refreshToken');

        axios({
          method: 'post',
          url: getEndpoint({ path: '/auth/refresh' }),
          data: { refreshToken },
        })
          .then(({ data }) => {
            const newAccessToken = data.accessToken;

            setCookie('accessToken', newAccessToken);
            setCookie('accessTokenUpdatedAt', new Date().toISOString());

            fetchingTokenPromise = null;

            if (DEVELOPMENT) {
              //simulate the api call delay
              wait(500).then(() => {
                resolve(newAccessToken);
              });
            } else {
              resolve(newAccessToken);
            }
          })
          .catch((e) => {
            fetchingTokenPromise = null;
            reject(e);
          });
      });

      return fetchingTokenPromise;
    };

    const handleFetchCall = async (accessToken: string | null) => {
      try {
        setStatus('BUSY');

        const resourcesArray = args instanceof Array ? args : [args];

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
          await wait(500);
        }

        const response = (
          args instanceof Array ? responseArray.map(({ data }) => data) : responseArray[0].data
        ) as Data;

        setResponse(response);
        onAfterSuccess?.(response);
        setStatus('SUCCESS');
        setWasCalled(true);
      } catch (e) {
        const { response } = e as AxiosError<{ message?: string; reazon?: ApiErrorReazon }>;

        const apiError: ApiError = {
          message: response?.data?.message || 'Something went wrong',
          reazon: response?.data?.reazon,
        };

        onAfterFailed?.(apiError);
        setResponse(null);
        setError(apiError);
        setStatus('FAILED');
        setWasCalled(true);
      }
    };

    const accessTokenUpdatedAt = getCookie('accessTokenUpdatedAt') as string | null;

    if (accessTokenUpdatedAt && isOutOfDateToken(accessTokenUpdatedAt)) {
      const accessToken = await handleFetchAccessToken();
      await handleFetchCall(accessToken);
    } else {
      const accessToken = getCookie('accessToken') as string | null;

      await handleFetchCall(accessToken);
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
