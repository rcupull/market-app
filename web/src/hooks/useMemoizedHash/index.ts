import { useMemo } from 'react';

export const useMemoizedHash = (): string => {
  return useMemo(() => `${Date.now()}`, []);
};
