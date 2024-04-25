import { useContext } from 'react';

import { CookiesContext } from '.';
import { CookiesUtils } from './types';

export const useCookies = (): CookiesUtils => useContext(CookiesContext);
