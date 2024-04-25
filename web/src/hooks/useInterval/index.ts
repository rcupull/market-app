import { useRef } from 'react';

type VoidFunction = () => void;

type Args = Array<VoidFunction> | VoidFunction;

export interface UseIntervalReturn {
  (args: Args, delay?: number): void;
  cancel(): void;
}
export const useInterval = (): UseIntervalReturn => {
  //@ts-expect-error ignore
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const nextCallbackToCall = useRef<number>(0);

  const out: UseIntervalReturn = (args, interval = 0) => {
    const callbackArray = Array.isArray(args) ? args : [args];

    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    intervalId.current = setInterval(() => {
      const callback = callbackArray[nextCallbackToCall.current];

      nextCallbackToCall.current = nextCallbackToCall.current + 1;
      if (nextCallbackToCall.current > callbackArray.length - 1) {
        nextCallbackToCall.current = 0;
      }

      callback();
    }, interval);
  };

  out.cancel = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  return out;
};
