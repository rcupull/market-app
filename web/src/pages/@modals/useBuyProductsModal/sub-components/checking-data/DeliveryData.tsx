import { useEffect } from 'react';

import { FieldCheckbox } from 'components/field-checkbox';
import { LabelValuePair } from 'components/label-value-pair';
import { MapOlPosition } from 'components/map/types';

import { useAuth } from 'features/api-slices/useAuth';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessDeliveryModal } from 'pages/@modals/useBusinessDeliveryModal';
import { DeliveryConfigType } from 'types/business';
import { StyleProps } from 'types/general';
import { getIsEnabledDelivery } from 'utils/business';
import { getDeliveryConfigPrice } from 'utils/delivery';
import { isNullOrUndefined } from 'utils/general';
import { getDistanceBetweenPositions } from 'utils/geolocation';

export interface DeliveryDataProps extends StyleProps {
  onChange: (value: boolean) => void;
  value: boolean;
}

export const DeliveryData = ({ className, onChange, value }: DeliveryDataProps) => {
  const { business } = useBusiness();
  const { authData } = useAuth();
  const businessDeliveryModal = useBusinessDeliveryModal();

  const isEnabledDelivery = getIsEnabledDelivery(business?.deliveryConfig);

  const deliveryType = business?.deliveryConfig?.type;

  useEffect(() => {
    if (isEnabledDelivery) {
      onChange(true);
    }
  }, [isEnabledDelivery]);

  const renderContainer = (children: React.ReactNode) => (
    <UpdateSomethingContainer
      title="Configuración de entrega al domicilio"
      onClick={() => businessDeliveryModal.open()}
      className={className}
    >
      {children}
    </UpdateSomethingContainer>
  );

  const renderDeliveryMessage = ({
    message,
    type,
    checkboxNode,
  }: {
    type: DeliveryConfigType;
    message: React.ReactNode;
    checkboxNode: React.ReactNode;
  }): React.ReactNode => {
    return (
      deliveryType === type && (
        <>
          <span className="font-semibold">{message}</span>
          {checkboxNode && <div className="mt-2">{checkboxNode}</div>}
        </>
      )
    );
  };

  const getDistance = (): number | null => {
    const businessPosition: MapOlPosition | undefined = business?.addresses
      ? {
          lat: business?.addresses?.[0]?.lat,
          lon: business?.addresses?.[0]?.lon,
        }
      : undefined;

    const userPosition: MapOlPosition | undefined = authData?.user?.addresses
      ? {
          lat: authData?.user?.addresses?.[0]?.lat,
          lon: authData?.user?.addresses?.[0]?.lon,
        }
      : undefined;

    if (!businessPosition || !userPosition) {
      return null;
    }

    return getDistanceBetweenPositions(businessPosition, userPosition);
  };

  const distance = getDistance();

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  const getPrice = (): number | null => {
    if (isNullOrUndefined(distance)) {
      return null;
    }

    switch (deliveryType) {
      case DeliveryConfigType.OPTIONAL: {
        if (!value) return 0;

        const { price } = getDeliveryConfigPrice({
          deliveryConfig: business?.deliveryConfig,
          distance,
        });

        return price;
      }
      case DeliveryConfigType.REQUIRED: {
        const { price } = getDeliveryConfigPrice({
          deliveryConfig: business?.deliveryConfig,
          distance,
        });

        return price;
      }
      default: {
        return 0;
      }
    }
  };

  const price = getPrice()

  return renderContainer(
    <div className="p-2">
      {renderDeliveryMessage({
        type: DeliveryConfigType.REQUIRED,
        message: 'La entrega al domicilio es obligatoria para todos los productos en este negocio.',
        checkboxNode: null,
      })}

      {renderDeliveryMessage({
        type: DeliveryConfigType.FREE,
        message: 'Este negocio posee mensagería gratis para todos sus productos.',
        checkboxNode: (
          <FieldCheckbox
            label="Haré uso del servicio de entrega"
            noUseFormik
            onChange={(e) => onChange(e.target.checked)}
            value={value}
          />
        ),
      })}

      {renderDeliveryMessage({
        type: DeliveryConfigType.OPTIONAL,
        message: 'Este negocio posee opcionalmente el servicio de entrega al domicilio.',
        checkboxNode: (
          <FieldCheckbox
            label="Incluir entraga al domicilio para esta orden"
            noUseFormik
            onChange={(e) => onChange(e.target.checked)}
            value={value}
          />
        ),
      })}

      {renderDeliveryMessage({
        type: DeliveryConfigType.NONE,
        message: (
          <span className="text-red-500">
            Este negocio no ofrece servicio de entrega al domicilio.
          </span>
        ),
        checkboxNode: null,
      })}

      <div className="flex justify-end w-full">
        <div className="flex flex-col sm:flex-row gap-4 border-2 border-gray-400 rounded-xl px-2">
          <LabelValuePair label="Distancia" value={`${distance} Kms`} />

          <LabelValuePair label="Precio de envío" value={`${price} CUP`} />
        </div>
      </div>
    </div>,
  );
};
