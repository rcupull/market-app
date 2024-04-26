import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';

export const useGeneralBusinessCategories = (): {
  generalBusinessCategories: FetchResource<
    void,
    {
      businessCategoryLabels: Record<string, string>;
      businessCategoryTree: AnyRecord;
    }
  >;
} => {
  const fetch = useFetch();

  return {
    generalBusinessCategories: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/general/business-categories',
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
