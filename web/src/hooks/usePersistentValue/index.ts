import React, { useEffect, useRef } from 'react';

export function usePersistentValue<T = unknown>(
  value: T,
  dependenciesArr?: React.DependencyList,
): React.MutableRefObject<T> {
  const dataRef = useRef<T>() as React.MutableRefObject<T>;

  useEffect(() => {
    dataRef.current = value;
  }, dependenciesArr);

  return dataRef;
}
