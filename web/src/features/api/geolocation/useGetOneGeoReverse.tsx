import { MapOlPosition } from 'components/map/types';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Address } from 'types/general';
import { getEndpoint } from 'utils/api';

export const useGetOneGeoReverse = (): {
  getOneGeoReverse: FetchResource<MapOlPosition, Address>;
} => {
  const fetch = useFetch();

  return {
    getOneGeoReverse: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ lat, lon }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({ path: '/geolocation/reverse', query: { lat, lon } }),
          },
          options
        );
      },
      reset: fetch[3],
    },
  };
};
