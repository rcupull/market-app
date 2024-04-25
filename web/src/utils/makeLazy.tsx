import React from 'react';

import { LazyLoadFallback } from 'components/lazy-load-fallback';

import loadable from '@loadable/component';

type LoadableArgs = Parameters<typeof loadable>;

type LoadableFn = () => Promise<{ default: React.ComponentType<any> }>;
type LoadableOptions = NonNullable<LoadableArgs[1]>;

export type LoadableReturn = ReturnType<typeof loadable>;

export const dynamic = (fn: LoadableFn, fallback?: LoadableOptions['fallback']): LoadableReturn => {
  return loadable(fn, {
    fallback: fallback || <LazyLoadFallback />,
  });
};
