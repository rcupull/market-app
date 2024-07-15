import { MapOlPosition } from 'components/map/types';

export const getCurrentLocation = async (): Promise<MapOlPosition> => {
  return new Promise<MapOlPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (e) => {
        console.error('Some error fetching geoposition');
        reject(e);
      }
    );
  });
};

/**
 * https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
 */
export const getDistanceBetweenPositions = (
  position1: MapOlPosition,
  position2: MapOlPosition
): number => {
  const lat1 = position1.lat;
  const lat2 = position2.lat;
  const lon1 = position1.lon;
  const lon2 = position2.lon;

  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  dist = dist * 1.609344;

  return Number(dist.toFixed(2));
};
