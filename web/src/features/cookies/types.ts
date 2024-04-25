import { useCookies } from 'react-cookie';

type UseCookies = typeof useCookies;

export interface CookiesUtils {
  getCookie: (key: string) => ReturnType<UseCookies>[0];
  getCookies: () => ReturnType<UseCookies>[0];
  setCookie: ReturnType<UseCookies>[1];
  removeCookie: ReturnType<UseCookies>[2];
}
