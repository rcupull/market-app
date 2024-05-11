import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateOneBusiness = (): {
  updateOneBusiness: FetchResource<
    {
      routeName: string;
      update: Partial<
        Pick<
          Business,
          | 'hidden'
          | 'socialLinks'
          | 'bannerImages'
          | 'name'
          | 'logo'
          | 'layouts'
          | 'aboutUsPage'
          | 'whatsAppPhoneNumber'
          | 'shoppingMeta'
          | 'postFormFields'
        >
      >;
    },
    void
  >;
} => {
  const fetch = useFetch();

  return {
    updateOneBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/business/:routeName',
              urlParams: { routeName },
            }),
            data: update,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
