import { persistentBackdoor } from 'features/persistent';
import { slices } from 'features/slices';

import { setupReduxBackdoor } from './setupReduxBackdoor';

import { configureStore } from '@reduxjs/toolkit';
import { dummyStatus } from 'constants/api';
import { combineReducers } from 'redux';
import { AuthData } from 'types/auth';
import { AnyRecord } from 'types/general';

export const makerStore = async (preloadedState: Partial<AnyRecord> = {}) => {
  const enhancedReducers = combineReducers({
    ...Object.values(slices).reduce((r, { name, reducer }) => ({ ...r, [name]: reducer }), {}),
  });

  const store = configureStore({
    reducer: enhancedReducers,
    preloadedState,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      //https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

  // setting authentication data
  const user = await persistentBackdoor.getPersistent('user');

  if (user) {
    const authData: AuthData = {
      user,
    };

    store.dispatch(
      slices.useAuth.actions.setState({
        data: authData,
        status: dummyStatus,
      })
    );
  }

  setupReduxBackdoor(store);

  return { store };
};
