import { useLocation, useNavigate } from 'react-router-dom';

import { getParamsFromPathname, queryToSearch, searchToQuery } from './utils';

import { Query } from 'types/api';
import { AnyRecord } from 'types/general';
import { getFlattenJson } from 'utils/general';

export interface UseRouterReturn<Q extends Query = Query> {
  pushRoute: (
    route: string,
    query?: AnyRecord,
    options?: {
      timeout?: number;
    }
  ) => void;
  onBack: () => void;
  queryToSearch: (query: Q) => void;
  pathname: string;
  query: Q;
  search: string;
  params: Record<string, string | undefined>;
  isHomePage: boolean;
  isAuthenticatedPage: boolean;
  //
  onChangeQuery: (
    partialQuery: Partial<Q>,
    options?: {
      timeout?: number;
      replaceAll?: boolean;
    }
  ) => void;
}

export const useRouter = <Q extends Query = Query>(): UseRouterReturn<Q> => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const params = getParamsFromPathname(pathname);

  const query = searchToQuery(search.slice(1)) as Q;

  const onChangeQuery: UseRouterReturn['onChangeQuery'] = (newQuery, options) => {
    const { timeout, replaceAll } = options || {};
    const handle = () => {
      const updatedQuery = replaceAll
        ? getFlattenJson(newQuery)
        : getFlattenJson({ ...query, ...newQuery });

      navigate({
        pathname: pathname,
        search: queryToSearch(updatedQuery)
      });
    };

    if (timeout) {
      setTimeout(handle, timeout);
      return;
    }
    handle();
  };

  const isDashboardPage = pathname.startsWith('/dashboard');

  const isAdminPage = pathname.startsWith('/admin');

  return {
    isHomePage: pathname === '/',
    isAuthenticatedPage: isDashboardPage || isAdminPage,
    //
    params,
    search,
    queryToSearch,
    onBack: () => navigate(-1),
    query,
    onChangeQuery,
    pathname,
    pushRoute: (pathname, query, options) => {
      const { timeout } = options || {};

      const handle = () => navigate(`${pathname}${query ? `?${queryToSearch(query)}` : ''}`);

      if (timeout) {
        setTimeout(handle, timeout);
        return;
      }
      handle();
    }
  };
};
