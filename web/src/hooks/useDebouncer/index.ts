import { useRef } from 'react';

export interface UseDebouncerReturn {
  (callback: (...args: any[]) => void, delay?: number): void;

  cancel(): void;
}
export const useDebouncer = (): UseDebouncerReturn => {
  //@ts-expect-error ignore
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const out: UseDebouncerReturn = (callback: () => void, delay = 0) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    timeoutId.current = setTimeout(callback, delay);
  };

  out.cancel = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  return out;
};
