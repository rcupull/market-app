import { createContext, useRef } from 'react';
import { CookiesProvider as ReactCookiesProvider, useCookies } from 'react-cookie';

import { CookiesUtils } from './types';

import { ChildrenProp } from 'types/general';

export let cookiesUtilsBackdoor: CookiesUtils = {
  setCookie: () => {
    console.log('calling default setCookie');
    /**NOP */
  },
  getCookie: () => {
    console.log('calling default getCookie');
    /**NOP */
  },
  getCookies: () => {
    console.log('calling default getCookies');
    /**NOP */
  },
  removeCookie: () => {
    console.log('calling default removeCookie');
    /**NOP */
  },
};

export const CookiesContext = createContext<CookiesUtils>(cookiesUtilsBackdoor);

const CookiesProvider = ({ children }: ChildrenProp) => {
  const args = useCookies();

  const useCookiesPersistent = useRef(args);
  useCookiesPersistent.current = args;

  const setCookie: CookiesUtils['setCookie'] = (name, value, options = {}) => {
    const [, setCookie] = useCookiesPersistent.current;
    setCookie(name, value, {
      path: '/',
      ...options,
    });
  };

  const getCookie: CookiesUtils['getCookie'] = (key) => {
    const [cookies] = useCookiesPersistent.current;
    return cookies[key];
  };

  const getCookies: CookiesUtils['getCookies'] = () => {
    const [cookies] = useCookiesPersistent.current;
    return cookies;
  };

  const removeCookie: CookiesUtils['removeCookie'] = (...args) => {
    const [, , removeCookie] = useCookiesPersistent.current;
    removeCookie(...args);
  };

  cookiesUtilsBackdoor = {
    getCookie,
    getCookies,
    removeCookie,
    setCookie,
  };

  return <CookiesContext.Provider value={cookiesUtilsBackdoor}>{children}</CookiesContext.Provider>;
};

export const CookiesService = ({ children }: ChildrenProp) => {
  return (
    <ReactCookiesProvider
      defaultSetOptions={{
        path: '/',
      }}
    >
      <CookiesProvider>{children}</CookiesProvider>
    </ReactCookiesProvider>
  );
};
