import { RefObject, useEffect, useMemo, useState } from 'react';
/**
 * https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
 */

export const useOnScreen = (ref: RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
    [ref],
  );

  useEffect(() => {
    //@ts-expect-error ignore error in observer
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};
