import { useRef } from 'react';

type VoidFunction = () => void;

type Args = Array<VoidFunction> | VoidFunction;

export interface UseIntervalReturn {
  (args: Args, delay?: number): void;
  cancel(): void;
}
export const useInterval = (options?: { startCalling?: boolean }): UseIntervalReturn => {
  const { startCalling } = options || {};

  //@ts-expect-error ignore
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const nextCallbackToCall = useRef<number>(0);

  const out: UseIntervalReturn = (args, interval = 0) => {
    const callbackArray = Array.isArray(args) ? args : [args];

    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    const callTheNextcallback = () => {
      const callback = callbackArray[nextCallbackToCall.current];

      nextCallbackToCall.current = nextCallbackToCall.current + 1;
      if (nextCallbackToCall.current > callbackArray.length - 1) {
        nextCallbackToCall.current = 0;
      }

      callback();
    };

    if (startCalling) callTheNextcallback();
    intervalId.current = setInterval(callTheNextcallback, interval);
  };

  out.cancel = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  return out;
};
