import { withTryCatch } from '../../utils/error';
import { Address, RequestHandler } from '../../types/general';
import { axios } from '../../utils/api';
import { geoapifyApikey } from '../../config';
import { makeReshaper } from '../../utils/makeReshaper';
import { GeoapifyResponse } from './types';
/**
 *  geoapify.com
 */
const get_geolocation_reverse: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query } = req;
      const { lat, lon } = query;

      const response = await axios({
        method: 'get',
        url: 'https://api.geoapify.com/v1/geocode/reverse',
        params: {
          lat,
          lon,
          apiKey: geoapifyApikey
        }
      });

      const geoapifyResponse: GeoapifyResponse = response.data;

      const address = makeReshaper<GeoapifyResponse, Address>({
        street: 'features.0.properties.street',
        city: 'features.0.properties.state',
        country: 'features.0.properties.country',
        countryCode: 'features.0.properties.country_code',
        lat: 'features.0.properties.lat',
        lon: 'features.0.properties.lon',
        number: 'features.0.properties.housenumber',
        postCode: 'features.0.properties.postcode',
        placeId: 'features.0.properties.place_id',
        municipality: 'features.0.properties.county',
        neighborhood: 'features.0.properties.suburb'
      })(geoapifyResponse);

      if (process.env.NODE_ENV === 'development') {
        console.log('----------------------------- geoapify location ---------------------------');
        console.log(geoapifyResponse.features[0].properties);
      }

      res.send(address);
    });
  };
};

export const geolocationHandles = {
  get_geolocation_reverse
};
