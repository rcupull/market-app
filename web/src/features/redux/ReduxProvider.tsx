import React, { useMemo } from 'react';
import { Provider } from 'react-redux';

import { makerStore } from './makeStore';

import { AnyRecord } from 'types/general';

export const ReduxProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<AnyRecord>;
}): JSX.Element => {
  const { store } = useMemo(() => {
    const { store } = makerStore(initialState);

    return { store };
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
