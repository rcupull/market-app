import qs from 'query-string';
import { Query } from 'types/api';

export const DEFAULT_PAGINATION = { page: 1 };

export const queryToSearch = (query: Query): string =>
  qs.stringify(query, {
    arrayFormat: 'bracket',
    skipEmptyString: true,
  });

export const searchToQuery = (search: string): Query =>
  qs.parse(search, {
    parseNumbers: true,
    arrayFormat: 'bracket',
    parseBooleans: true,
  });

export const getParamsFromPathname = (
  pathname: string,
): {
  routeName?: string;
  postId?: string;
  shoppingId?: string;
  code?: string;
} => {
  const allSections = pathname.split('/');

  const getParam = (sections: string[]): string | undefined => {
    const index = allSections.findIndex((section) => sections.includes(section));
    return index >= 0 ? allSections[index + 1] : undefined;
  };

  return {
    routeName: getParam(['b', 'business']),
    postId: getParam(['posts']),
    shoppingId: getParam(['shopping']),
    code: getParam(['validate', 'forgot-password']),
  };
};
