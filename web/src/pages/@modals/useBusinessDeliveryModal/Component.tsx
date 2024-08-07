import { AddressView } from 'components/address-view';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldAddress } from 'components/field-address';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useCloseContext } from 'features/modal/closeContext/useCloseContext';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';
import { PriceTesting } from './PriceTesting';

import { DeliveryConfig, DeliveryConfigType } from 'types/business';
import { Address } from 'types/general';
import { getDeliveryUtils } from 'utils/business';

export interface State {
  deliveryConfig?: DeliveryConfig;
  address?: Address;
}
export interface ComponentProps {
  portal: Portal;
}
export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const { onChangeUnsavedChanges } = useCloseContext();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  return (
    <Formux<State>
      value={{
        deliveryConfig: business.deliveryConfig,
        address: business.addresses?.[0]
      }}
    >
      {({ value, hasChange }) => {
        onChangeUnsavedChanges(hasChange);

        const isEnabledDelivery = getDeliveryUtils().getIsEnabled({
          deliveryConfig: value.deliveryConfig
        });

        return (
          <form className="w-full">
            <FieldAddress
              label="Dirección del negocio"
              name="address"
              collapsable
              collapsableHeader={<AddressView address={value.address} />}
            />

            <Divider />

            <FieldRadioGroup<{ value: DeliveryConfigType; label: string }>
              label="Tipo de entrega a domicilio"
              name="deliveryConfig.type"
              renderOption={({ checked, item }) => {
                return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
              }}
              optionToValue={({ value }) => value}
              items={[
                {
                  value: DeliveryConfigType.NONE,
                  label: 'Ninguno'
                },
                {
                  value: DeliveryConfigType.FREE,
                  label: 'Gratis'
                },
                {
                  value: DeliveryConfigType.OPTIONAL,
                  label: 'Opcional'
                },
                {
                  value: DeliveryConfigType.REQUIRED,
                  label: 'Obligatorio'
                }
              ]}
              containerClassName="flex items-center flex-wrap gap-4"
            />

            <Divider />

            <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
              <FieldInput
                name="deliveryConfig.minPrice"
                type="number"
                label="Precio mínimo"
                disabled={
                  !isEnabledDelivery || value.deliveryConfig?.type === DeliveryConfigType.FREE
                }
                description="El precio minimo para realizar la entrega valorado con distancia = 0km"
              />

              <FieldInput
                name="deliveryConfig.priceByKm"
                type="number"
                label="Precio por km"
                description="El precio por km para realizar la entrega. El total es calculado como <total> = <precio mínimo> + <distancia> * <precio por km>"
                disabled={
                  !isEnabledDelivery || value.deliveryConfig?.type === DeliveryConfigType.FREE
                }
              />
            </div>

            {(value.deliveryConfig?.type === DeliveryConfigType.OPTIONAL ||
              value.deliveryConfig?.type === DeliveryConfigType.REQUIRED) && (
              <>
                <Divider />
                <PriceTesting deliveryConfig={value.deliveryConfig} />
              </>
            )}

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                formuxSubmit
                onClick={() => {
                  updateOneBusiness.fetch(
                    {
                      update: {
                        deliveryConfig: value.deliveryConfig,
                        addresses: value.address ? [value.address] : []
                      },
                      routeName
                    },
                    {
                      onAfterSuccess: () => {
                        onFetch({ routeName });
                        onClose();
                      }
                    }
                  );
                }}
                variant="primary"
                className="w-full"
              />
            )}
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
