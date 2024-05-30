import { useLocation, useNavigate } from 'react-router-dom';

import { queryToSearch, searchToQuery } from './utils';

import { Query } from 'types/api';
import { AnyRecord } from 'types/general';
import {
  getBusinessAboutUsRoute,
  getBusinessRoute,
  getOnePostRoute,
  getPostsRoute,
  getShoppingRoute,
} from 'utils/business';
import { getFlattenJson } from 'utils/general';

const getParamsFromPathname = (
  pathname: string,
): {
  routeName?: string;
  postId?: string;
  shoppingId?: string;
} => {
  let routeName = undefined;
  let postId = undefined;
  let shoppingId = undefined;

  const sections = pathname.split('/');

  const businessIndex = sections.findIndex((section) => section === 'b' || section === 'business');
  if (businessIndex >= 0) {
    routeName = sections[businessIndex + 1];
  }
  ///////////////////////////////////////////////////////////////////////////
  const postsIndex = sections.findIndex((section) => section === 'posts');

  if (postsIndex >= 0) {
    postId = sections[postsIndex + 1];
  }
  ///////////////////////////////////////////////////////////////////////////
  const shoppingIndex = sections.findIndex((section) => section === 'shopping');

  if (shoppingIndex >= 0) {
    shoppingId = sections[shoppingIndex + 1];
  }

  ///////////////////////////////////////////////////////////////////////////
  return {
    routeName,
    postId,
    shoppingId,
  };
};

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
  isThisPostPage: (args: { postId: string; routeName: string }) => boolean;
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

  const params = getParamsFromPathname(pathname);

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
    isBusinessPage: pathname.startsWith(getBusinessRoute()),
    isShoppingPage: !!routeName && pathname.startsWith(getShoppingRoute({ routeName })),
    isPostPage: !!routeName && pathname.startsWith(getPostsRoute({ routeName })),
    isThisPostPage: ({ routeName, postId }) => {
      return pathname.startsWith(getOnePostRoute({ postId, routeName }));
    },
    isAboutUsPage: pathname.startsWith(`/about-us`),
    isBusinessAboutUsPage:
      !!routeName && pathname.startsWith(getBusinessAboutUsRoute({ routeName })),
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
