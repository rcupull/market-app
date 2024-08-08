import { useRef } from 'react';
import { CookiesProvider as ReactPersistentsProvider, useCookies } from 'react-cookie';

import { PersistentContext } from './Context';
import { PersistentUtils } from './types';

import { ChildrenProp } from 'types/general';

const PersistentsUtilsContext = ({ children }: ChildrenProp) => {
  const args = useCookies();

  const usePersistentsPersistent = useRef(args);
  usePersistentsPersistent.current = args;

  const setPersistent: PersistentUtils['setPersistent'] = async (name, value, options = {}) => {
    const [, setPersistent] = usePersistentsPersistent.current;
    setPersistent(name, value, {
      path: '/',
      ...options
    });
  };

  const getPersistent: PersistentUtils['getPersistent'] = async (key) => {
    const [cookies] = usePersistentsPersistent.current;
    return cookies[key];
  };

  const removePersistent: PersistentUtils['removePersistent'] = async (...args) => {
    const [, , removePersistent] = usePersistentsPersistent.current;
    removePersistent(...args);
  };

  return (
    <PersistentContext.Provider
      value={{
        getPersistent,
        removePersistent,
        setPersistent
      }}
    >
      {children}
    </PersistentContext.Provider>
  );
};

const PersistentProviderWeb = ({ children }: ChildrenProp) => {
  return (
    <ReactPersistentsProvider
      defaultSetOptions={{
        path: '/'
      }}
    >
      <PersistentsUtilsContext>{children}</PersistentsUtilsContext>
    </ReactPersistentsProvider>
  );
};

export default PersistentProviderWeb;
