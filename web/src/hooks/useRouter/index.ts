import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { queryToSearch, searchToQuery } from './utils';

import { Query } from 'types/api';
import { AnyRecord } from 'types/general';
import { getFlattenJson } from 'utils/general';

interface UseRouterReturn {
  pushRoute: (
    route: string,
    query?: AnyRecord,
    options?: {
      timeout?: number;
    },
  ) => void;
  onBack: () => void;
  queryToSearch: (query: Query) => void;
  pathname: string;
  query: Query;
  search: string;
  params: Record<string, string | undefined>;
  //
  isBusinessPage: boolean;
  isShoppingPage: boolean;
  isPostPage: boolean;
  isBusinessAboutUsPage: boolean;
  isDashboardPage: boolean;
  isAdminPage: boolean;
  isAboutUsPage: boolean;
  isHomePage: boolean;
  isAuthenticatedPage: boolean;
  //
  onChangeQuery: (
    partialQuery: Query,
    options?: {
      timeout?: number;
    },
  ) => void;
}

export const useRouter = (): UseRouterReturn => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = useParams();
  const query = searchToQuery(search.slice(1)) as Query;

  const onChangeQuery: UseRouterReturn['onChangeQuery'] = (newQuery, options) => {
    const { timeout } = options || {};
    const handle = () => {
      const updatedQuery = getFlattenJson({ ...query, ...newQuery });

      navigate({
        pathname: pathname,
        search: queryToSearch(updatedQuery),
      });
    };

    if (timeout) {
      setTimeout(handle, timeout);
      return;
    }
    handle();
  };

  const { routeName } = params;

  const isDashboardPage = pathname.startsWith('/dashboard');

  const isAdminPage = pathname.startsWith('/admin');
  return {
    isBusinessPage: pathname.startsWith(`/${routeName}`),
    isShoppingPage: pathname.startsWith(`/${routeName}/shopping`),
    isPostPage: pathname.startsWith(`/${routeName}/posts`),
    isAboutUsPage: pathname.startsWith(`/about-us`),
    isBusinessAboutUsPage: pathname.startsWith(`/${routeName}/about-us`),
    isDashboardPage,
    isAdminPage,
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
    },
  };
};
