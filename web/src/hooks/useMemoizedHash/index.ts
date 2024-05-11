import { useMemo } from 'react';

import { getRandomHash } from 'utils/general';

export const useMemoizedHash = (): string => {
  return useMemo(() => getRandomHash(), []);
};
