import { cookiesUtilsBackdoor } from 'features/cookies';
import { slices } from 'features/slices';

import { setupReduxBackdoor } from './setupReduxBackdoor';

import { configureStore } from '@reduxjs/toolkit';
import { dummyStatus } from 'constants/api';
import { combineReducers } from 'redux';
import { AuthData, User } from 'types/auth';
import { AnyRecord } from 'types/general';

export const makerStore = (preloadedState: Partial<AnyRecord> = {}) => {
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
  const token = cookiesUtilsBackdoor.getCookie('token') as string | null;
  const user = cookiesUtilsBackdoor.getCookie('user') as User | null;
  if (token && user) {
    const authData: AuthData = {
      token,
      user,
    };

    store.dispatch(
      slices.useAuth.actions.setState({
        data: authData,
        status: dummyStatus,
      }),
    );
  }

  setupReduxBackdoor(store);

  return { store };
};
