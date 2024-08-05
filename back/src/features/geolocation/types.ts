export interface GeoapifyResponse {
  type: 'FeatureCollection';
  features: [
    {
      type: 'Feature';
      geometry: {
        type: 'Point';
        coordinates: [number, number];
      };
      properties: {
        country_code: 'cu';
        name: string;
        housenumber: string;
        street: string;
        country: string;
        county: string;
        district: string;
        neighbourhood: string;
        suburb: string;
        datasource: {
          sourcename: string;
          attribution: string;
          license: string;
          url: string;
        };
        state: string;
        city: string;
        lon: number;
        lat: number;
        distance: number;
        result_type: string;
        postcode: string;
        formatted: string;
        address_line1: string;
        address_line2: string;
        timezone: {
          name: string;
          offset_STD: string;
          offset_STD_seconds: number;
          offset_DST: string;
          offset_DST_seconds: number;
          abbreviation_STD: string;
          abbreviation_DST: string;
        };
        plus_code: string;
        plus_code_short: string;
        rank: {
          popularity: number;
        };
        place_id: string;
      };
    }
  ];
  query: {
    lat: number;
    lon: number;
    plus_code: string;
  };
}

export const geoapifyResponseExample: GeoapifyResponse = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.383465, 23.035171]
      },
      properties: {
        country_code: 'cu',
        name: 'Instituto de Ecología y Sistemática',
        housenumber: '11835',
        street: 'Varona',
        country: 'Cuba',
        district: 'Elécrico',
        neighbourhood: 'Ciudad Jardín',
        suburb: 'Reparto Eléctrico',
        county: 'Arroyo Naranjo',
        datasource: {
          sourcename: 'openstreetmap',
          attribution: '© OpenStreetMap contributors',
          license: 'Open Database License',
          url: 'https://www.openstreetmap.org/copyright'
        },
        state: 'La Habana',
        city: 'Havana',
        lon: -82.383465,
        lat: 23.035171,
        distance: 402.56520979406366,
        result_type: 'amenity',
        postcode: '19220',
        formatted: 'Instituto de Ecología y Sistemática, Varona 11835, Havana, 19220, Cuba',
        address_line1: 'Instituto de Ecología y Sistemática',
        address_line2: 'Varona 11835, Havana, 19220, Cuba',
        timezone: {
          name: 'America/Havana',
          offset_STD: '-05:00',
          offset_STD_seconds: -18000,
          offset_DST: '-04:00',
          offset_DST_seconds: -14400,
          abbreviation_STD: 'CST',
          abbreviation_DST: 'CDT'
        },
        plus_code: '76MV2JP8+3J',
        plus_code_short: '2JP8+3J Havana, Arroyo Naranjo, Cuba',
        rank: {
          popularity: 1.591313761829016
        },
        place_id:
          '51488ac8b08a9854c05982c476f700093740f00103f901dde93f4b01000000c00201920325496e7374697475746f2064652045636f6c6f67c3ad6120792053697374656dc3a174696361e203236f70656e7374726565746d61703a76656e75653a6e6f64652f35353537343437313333'
      }
    }
  ],
  query: {
    lat: 23.037764323775747,
    lon: -82.38621008988393,
    plus_code: '76MV2JQ7+4G'
  }
};
