import { useEffect } from 'react';

import { FieldCheckbox } from 'components/field-checkbox';
import { LabelValuePair } from 'components/label-value-pair';

import { useAuth } from 'features/api-slices/useAuth';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessDeliveryModal } from 'pages/@modals/useBusinessDeliveryModal';
import { DeliveryConfigType } from 'types/business';
import { StyleProps } from 'types/general';
import { getDeliveryUtils } from 'utils/business';

export interface DeliveryDataProps extends StyleProps {
  onChangeTakeDelivery: (value: boolean) => void;
  takeDelivery: boolean;
}

export const DeliveryData = ({
  className,
  onChangeTakeDelivery,
  takeDelivery,
}: DeliveryDataProps) => {
  const { business } = useBusiness();
  const { authData } = useAuth();
  const businessDeliveryModal = useBusinessDeliveryModal();

  const isEnabledDelivery = getDeliveryUtils().getIsEnabled({
    deliveryConfig: business?.deliveryConfig,
  });

  const deliveryType = business?.deliveryConfig?.type;

  useEffect(() => {
    if (isEnabledDelivery) {
      onChangeTakeDelivery(true);
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

  const { getDistance, getPrice } = getDeliveryUtils();

  const distance = getDistance({
    businessAddress: business?.addresses?.[0],
    userAddress: authData?.user?.addresses?.[0],
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  const price = getPrice({ distance, deliveryConfig: business?.deliveryConfig });

  const renderDeliveryPrice = () => {
    if (!takeDelivery) return null;
    if (deliveryType === DeliveryConfigType.FREE) return null;

    return (
      <div className="flex justify-end w-full mt-2">
        <div className="flex flex-col sm:flex-row gap-4 border-2 border-gray-400 rounded-xl px-2">
          <LabelValuePair label="Distancia" value={`${distance} Kms`} />

          <LabelValuePair label="Precio de envío" value={`${price} CUP`} />
        </div>
      </div>
    );
  };
  return renderContainer(
    <div className="p-2">
      {renderDeliveryMessage({
        type: DeliveryConfigType.REQUIRED,
        message: 'La entrega al domicilio es obligatoria para todos los productos en este negocio.',
        checkboxNode: null,
      })}

      {renderDeliveryMessage({
        type: DeliveryConfigType.FREE,
        message: (
          <span className="text-green-600">
            Este negocio posee mensagería gratis para todos sus productos.
          </span>
        ),
        checkboxNode: (
          <FieldCheckbox
            label="Haré uso del servicio de entrega"
            noUseFormik
            onChange={(e) => onChangeTakeDelivery(e.target.checked)}
            value={takeDelivery}
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
            onChange={(e) => onChangeTakeDelivery(e.target.checked)}
            value={takeDelivery}
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

      {renderDeliveryPrice()}
    </div>
  );
};
