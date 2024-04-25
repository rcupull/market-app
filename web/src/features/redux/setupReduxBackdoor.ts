import type { Store } from 'redux';

interface WrappedStore {
  dispatch: Store['dispatch'];
  getState: Store['getState'];
  subscribe: Store['subscribe'];
}

const store: WrappedStore = {
  dispatch: (action) => action,
  getState: () => ({}),
  subscribe: () => () => undefined,
};

/*
 * This odd function allows us to provide access to the redux store.  This needs
 * to be called at the time the redux store is set up.  Thereafter,
 * it provides access to the main functions from the store to things that
 * want and need to access it from outside of connected components.
 */
const setupReduxBackdoor = (reduxStore: Store): void => {
  store.dispatch = (...args) => reduxStore.dispatch(...args);
  store.getState = () => reduxStore.getState();
  store.subscribe = (...args) => reduxStore.subscribe(...args);
};

export { store, setupReduxBackdoor };
export type { WrappedStore };
