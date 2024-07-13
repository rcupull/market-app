import { useEffect, useState } from 'react';

import { ButtonSave } from 'components/button-save';
import { IconButtonLocation, IconButtonLocationProps } from 'components/icon-button-location';
import { MapOlPosition } from 'components/map/types';

import { useGetOneGeoReverse } from 'features/api/geolocation/useGetOneGeoReverse';
import { useModal } from 'features/modal/useModal';

import { useMapModal } from '../useMapModal';

import { Address } from 'types/general';
import { getCurrentLocation } from 'utils/geolocation';

export interface ButtonMapLocationProps
  extends Omit<IconButtonLocationProps, 'onChange' | 'value'> {
  onChange: (value: Address) => void;
  value: Address | undefined;
}

export const ButtonMapLocation = ({ onChange, value, ...props }: ButtonMapLocationProps) => {
  const mapModal = useMapModal();

  return (
    <IconButtonLocation
      as="div"
      stopPropagation
      preventDefault
      onClick={() => {
        mapModal.open({
          useMapModalArgs: () => {
            const { onClose } = useModal();
            const [selectedPosition, setSelectedPosition] = useState<MapOlPosition>();
            const [center, setCenter] = useState<MapOlPosition>();

            const { getOneGeoReverse } = useGetOneGeoReverse();

            useEffect(() => {
              if (value?.lat && value.lon) {
                setCenter(value);
                setSelectedPosition(value);
              } else {
                getCurrentLocation().then((position) => {
                  setCenter(position);
                  setSelectedPosition(position);
                });
              }
            }, []);

            return {
              modalTitle: 'Seleccionar ubicación',
              onClick: ({ position }) => setSelectedPosition(position),
              markers: selectedPosition && [selectedPosition],
              center,
              zoom: 15,
              primaryBtn: (
                <ButtonSave
                  label="Seleccionar"
                  isBusy={getOneGeoReverse.status.isBusy}
                  onClick={() => {
                    if (!selectedPosition) return;

                    getOneGeoReverse.fetch(selectedPosition, {
                      onAfterSuccess: (response) => {
                        onClose();
                        onChange?.(response);
                      },
                    });
                  }}
                />
              ),
            };
          },
        });
      }}
      {...props}
    />
  );
};
