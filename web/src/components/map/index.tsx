import { useEffect, useRef, useState } from 'react';

import { MapOlMarker, MapOlPosition } from './types';
import {
  coordinateToPosition,
  getClosedMarker,
  havanaPosition,
  positionToCoordinate,
} from './utils';

import { Feature, Map, MapBrowserEvent, View } from 'ol';
import * as geom from 'ol/geom';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, transform } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import OSM from 'ol/source/OSM';
import * as style from 'ol/style';
import { StyleProps } from 'types/general';
import { cn, isNumber } from 'utils/general';

/**
 * https://gis.stackexchange.com/questions/460908/adding-removing-and-modifying-markers-in-openlayers
 * https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.useGeographic
 */
export interface MapOlProps extends StyleProps {
  onClick?: (args: { position: MapOlPosition }) => void;
  onMarkerClick?: (marker: MapOlMarker) => void;
  center?: MapOlPosition;
  markers?: Array<MapOlMarker>;
  zoom?: number;
  onChangeZoom?: (zoom: number) => void;
}

export const MapOl = ({
  onClick,
  onMarkerClick,
  center = havanaPosition,
  markers,
  className,
  zoom,
  onChangeZoom,
}: MapOlProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();
  const refVector = useRef<VectorLayer<any>>();

  const [zoomState, setZoomState] = useState<number>(8);

  ////////////////////////////////////////////////////////////////////////

  /**
   *  ON CLICK EVENT
   */
  const refMeta = useRef<{
    onClick: MapOlProps['onClick'];
    onMarkerClick: MapOlProps['onMarkerClick'];
    markers: MapOlProps['markers'];
    zoomState: number;
  }>({
    zoomState,
    onMarkerClick: () => {},
    onClick: () => {},
    markers: [],
  });
  refMeta.current = {
    onClick,
    onMarkerClick,
    markers,
    zoomState,
  };

  const handleClick = (e: MapBrowserEvent<any>) => {
    const { onClick, onMarkerClick, zoomState, markers } = refMeta.current || {};

    const clickedPosition = coordinateToPosition(e.coordinate);

    const closedMarker = getClosedMarker({
      position: clickedPosition,
      markers,
      zoom: zoomState,
    });

    if (closedMarker) {
      return onMarkerClick?.(closedMarker);
    }

    onClick?.({
      position: clickedPosition,
    });
  };

  ////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (ref.current) {
      const vectorLayer = new VectorLayer({
        source: new VectorSource({ wrapX: false }),
        style: new style.Style({
          image: new style.Icon({
            src: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          }),
        }),
      });

      refVector.current = vectorLayer;

      const map = new Map({
        target: ref.current,
        layers: [
          new Tile({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: positionToCoordinate(center),
        }),
      });

      setMap(map);

      //@ts-expect-error ignore error type
      map.addEventListener('click', handleClick);

      map.on('moveend', () => {
        const newZoom = map.getView()?.getZoom();

        if (isNumber(newZoom)) {
          setZoomState(newZoom);
          onChangeZoom?.(newZoom);
        }
      });
    }
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Setting center
   * https://gis.stackexchange.com/questions/112892/change-openlayers-3-view-center
   */
  useEffect(() => {
    if (center && map) {
      map.getView().setCenter(transform([center.lon, center.lat], 'EPSG:4326', 'EPSG:3857'));
    }
  }, [JSON.stringify(center)]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Setting center
   * https://gis.stackexchange.com/questions/112892/change-openlayers-3-view-center
   */
  useEffect(() => {
    if (isNumber(zoom)) {
      setZoomState(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if (zoomState && map) {
      map.getView().setZoom(zoomState);
    }
  }, [zoomState, map]);

  useEffect(() => {
    if (refVector.current) {
      refVector.current.getSource()?.clear();

      if (markers?.length) {
        refVector.current.getSource()?.addFeatures(
          markers.map(({ lat, lon }) => {
            const feature = new Feature({
              type: 'marker',
              geometry: new geom.Point(fromLonLat([lon, lat])),
            });

            return feature;
          })
        );
      }
    }
  }, [JSON.stringify(markers)]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  return <div ref={ref} className={cn('w-full h-[30rem]', className)} />;
};
