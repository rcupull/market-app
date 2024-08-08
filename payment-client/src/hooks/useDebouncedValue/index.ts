import { useEffect, useRef, useState } from 'react';

import { useDebouncer } from 'hooks/useDebouncer';

export function useDebouncedValue<T = any>(value: T, delay = 0): T {
  const previousValue = useRef(value);
  const [current, setCurrent] = useState(value);

  const debouncer = useDebouncer();

  const debouncedSetCurrent = (v: T) => debouncer(() => setCurrent(v), delay);

  useEffect(() => {
    if (value !== previousValue.current) {
      debouncedSetCurrent(value);
      previousValue.current = value;
      return debouncer.cancel;
    }
    return;
  }, [value]);

  return current;
}
