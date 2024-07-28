import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { makerStore } from './makeStore';

import { Store } from 'redux';
import { ReduxState } from 'types/redux';

export const ReduxProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<ReduxState>;
}): JSX.Element => {
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    makerStore(initialState).then((res) => setStore(res.store));
  }, []);

  if (!store) return <></>;

  return <Provider store={store}>{children}</Provider>;
};
