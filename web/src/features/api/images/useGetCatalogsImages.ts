import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export interface UseGetCatalogImagesResponse {
  result: Array<{
    id: string;
    title: string;
    url: string;
    originalUrl: string;
    height: number;
    width: number;
  }>;
  search: string;
}

export const useGetCatalogsImages = (): {
  getCatalogsImages: FetchResource<{ search: string }, UseGetCatalogImagesResponse>;
} => {
  const fetch = useFetch();

  return {
    getCatalogsImages: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ search }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/catalogs/images',
              query: { search }
            })
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
