import {  useState } from 'react';

import { MapOl } from '.';
import { MapOlPosition } from './types';
import { havanaPosition } from './utils';

import { isEqual } from 'utils/general';

export default {
  component: MapOl,
};

export const Default = (): JSX.Element => {
  return <MapOl />;
};

export const ChangeCenter = (): JSX.Element => {
  const [center, setCenter] = useState<MapOlPosition>();

  return (
    <>
      <MapOl markers={center ? [center] : undefined}  onClick={({ position }) => setCenter(position)} className="!h-96" />
      <MapOl center={center} className="!h-96" />
    </>
  );
};

export const AddingMarkers = (): JSX.Element => {
  const [markers, setMarkers] = useState<Array<MapOlPosition>>([havanaPosition]);

  return (
    <MapOl
      markers={markers}
      onMarkerClick={(marker) => {
        setMarkers(markers.filter((m) => !isEqual(m, marker)));
      }}
      onClick={({ position }) => {
        setMarkers([...markers, position]);
      }}
    />
  );
};
