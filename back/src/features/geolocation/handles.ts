import { withTryCatch } from '../../utils/error';
import { RequestHandler } from '../../types/general';
import { axios } from '../../utils/api';
import { geoapifyApikey } from '../../config';
/**
 *  geoapify.com
 */
const get_geolocation_reverse: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query } = req;
      const { lat, lon } = query;

      const { data } = await axios({
        method: 'get',
        url: 'https://api.geoapify.com/v1/geocode/reverse',
        params: {
          lat,
          lon,
          apiKey: geoapifyApikey,
        },
      });

      res.send(data);
    });
  };
};

export const geolocationHandles = {
  get_geolocation_reverse,
};
