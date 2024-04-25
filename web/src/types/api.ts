import { FetchOptions } from 'hooks/useFetch';

import { AnyRecord } from './general';

//eslint-disable-next-line
import { ParsedQuery } from 'query-string';

export type OnAfterSuccess<Data = any> = (reponse: Data) => void | Promise<void>;
export type OnAfterFailed = (error: ApiError) => void;
export type OnRefresh = () => void;

export interface FetchResource<Args = void, Data = any> {
  data: FetchData<Data>;
  fetch: (args: Args, options?: FetchOptions<Data>) => void;
  status: FetchStatus;
  reset: () => void;
}

export interface Paginator {
  dataCount: number;
  offset: number;
  limit: number;
  pageCount: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

export interface PaginatedData<D extends AnyRecord = AnyRecord> {
  data: Array<D>;
  paginator: Paginator;
}

export interface FetchResourceWithPagination<Args = undefined, D extends AnyRecord = AnyRecord> {
  data: PaginatedData<D>['data'] | null;
  paginator?: PaginatedData<D>['paginator'] | null;
  fetch: (args: Args, options?: FetchOptions<PaginatedData<D>>) => void;
  status: FetchStatus;
  reset: () => void;
}

export type ApiStatus = 'NOT_STARTED' | 'BUSY' | 'SUCCESS' | 'FAILED';

export interface ApiError {
  message: string;
}

export type UrlParams = AnyRecord;
export type Headers = Record<string, string>;
export type Query = ParsedQuery<string | number | boolean | undefined>;

export type FetchMethod = 'get' | 'post' | 'put' | 'delete';

export type GetEndpoint = (args: { path: string; query?: Query; urlParams?: UrlParams }) => string;

export interface BasicFetchArgs {
  method: FetchMethod;
  url: string;
  data?: any;
  headers?: Headers;
}

export interface FetchArgs extends BasicFetchArgs {
  query?: Query;
  urlParams?: UrlParams;
}

export type AmplifyParams = BasicFetchArgs;

export type FetchStatus = {
  isBusy: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  isNotStarted: boolean;
  error: ApiError | null;
  wasCalled: boolean;
};

export type FetchData<Data = unknown> = Data | null;

export type GetAllPostsQuery = {
  routeNames?: Array<string>;
  postsIds?: Array<string>;
  //
  postCategoriesMethod?: 'every' | 'some';
  postCategoriesTags?: Array<string>;
  search?: string;
  includeHidden?: boolean;
  //
  limit?: number;
  page?: number;
};

export type GetAllBusinessQuery = {
  routeNames?: Array<string>;
  search?: string;
  includeHidden?: boolean;
  userId?: string;
  //
  limit?: number;
  page?: number;
  pagination?: boolean;
};
