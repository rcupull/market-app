import { MapOlMarker, MapOlPosition } from './types';

import { fromLonLat, toLonLat } from 'ol/proj';

export const closedPositionTh = 1000;

export const havanaPosition: MapOlPosition = {
  lon: -82.417885,
  lat: 23.097712,
};

export const positionToCoordinate = (position: MapOlPosition) => {
  return fromLonLat([position.lon, position.lat]);
};

export const coordinateToPosition = (coordinate: Array<number>): MapOlPosition => {
  const [lon, lat] = toLonLat(coordinate);

  return {
    lat,
    lon,
  };
};

export const getClosedMarker = ({
  position,
  markers,
  zoom,
}: {
  position: MapOlPosition;
  markers: Array<MapOlMarker> | undefined;
  zoom: number;
}): MapOlMarker | undefined => {
  if (!markers?.length) return undefined;

  const out = markers.find((marker) => {
    const latDiff = marker.lat - position.lat;
    const lonDiff = marker.lon - position.lon;
    const sqrt = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lonDiff, 2));
    /**
     * The work of the Gods ;)
     */
    const calc = (sqrt * Math.pow(zoom, 7.5)) / 100;
    /**
     *
     */
    return calc < 5000;
  });

  return out;
};
