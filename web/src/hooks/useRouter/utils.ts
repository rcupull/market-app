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
