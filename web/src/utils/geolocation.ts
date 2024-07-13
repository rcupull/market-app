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
