import { useState } from 'react';

import { Button } from 'components/button';

import { MapOl } from '.';
import { MapOlPosition } from './types';
import { havanaPosition } from './utils';

import { isEqual } from 'utils/general';

export default {
  component: MapOl
};

export const Default = (): JSX.Element => {
  return <MapOl />;
};

export const ChangeCenter = (): JSX.Element => {
  const [center, setCenter] = useState<MapOlPosition>();

  return (
    <>
      <MapOl
        markers={center ? [center] : undefined}
        onClick={({ position }) => setCenter(position)}
        className="!h-96"
      />
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

export const ChangeZoom = (): JSX.Element => {
  const [zoom, setZoom] = useState<number>();

  return (
    <>
      <div>
        the zoom is equal:
        {zoom}
      </div>
      <div className="flex gap-4 my-3">
        <Button label="zoom 5" onClick={() => setZoom(5)} />
        <Button label="zoom 2" onClick={() => setZoom(2)} />
        <Button label="zoom 10" onClick={() => setZoom(10)} />
      </div>
      <MapOl zoom={zoom} onChangeZoom={setZoom} className="!h-96" />
    </>
  );
};
