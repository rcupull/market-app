import { RefObject, useState } from 'react';

export const useScrollBottom = (
  ref: RefObject<HTMLElement>,
  onScrollBottom: () => void,
  options?: {
    backWayDiff?: number; // in px
  },
): {
  onScroll: () => void;
} => {
  const [fromUp, setFromUp] = useState(false);
  const { backWayDiff = 100 } = options || {};

  return {
    onScroll: () => {
      if (ref?.current) {
        const { scrollTop, clientHeight, scrollHeight } = ref.current;

        if (Math.abs(scrollTop + clientHeight - scrollHeight) > backWayDiff) {
          setFromUp(true);
        }

        if (Math.abs(scrollTop + clientHeight - scrollHeight) <= 2 && fromUp) {
          setFromUp(false);
          onScrollBottom?.();
        }
      }
    },
  };
};
