import { useState } from 'react';

import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Business, BusinessNotificationFlags } from 'types/business';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

interface State extends Pick<Business, 'notificationFlags'> {}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business, onFetch } = useBusiness();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const initialState: State = {
    notificationFlags: business?.notificationFlags
  };
  const [state, setState] = useState<State>(initialState);

  return (
    <div>
      Asere Market le notificará mediante la aplicación sobre el estado de sus negocios, órdenes de
      compra y otras informaciones importantes.
      <Divider />
      <Formux<State> value={state} onChange={setState}>
        {({ value }) => {
          const handleSubmit = () => {
            if (!business) return;
            const { notificationFlags } = value;
            updateOneBusiness.fetch(
              {
                routeName: business.routeName,
                update: {
                  notificationFlags
                }
              },
              {
                onAfterSuccess: () => {
                  onAfterSuccess?.();
                  onFetch({ routeName: business.routeName });
                }
              }
            );
          };

          return (
            <form>
              <FieldRadioGroup<{
                value: BusinessNotificationFlags;
                label: string;
                description: string;
              }>
                label="Quiero recibir notificaciones:"
                name="notificationFlags"
                renderOption={({ checked, item }) => {
                  return (
                    <FieldCheckbox
                      noUseFormik
                      value={checked}
                      label={item.label}
                      description={item.description}
                    />
                  );
                }}
                multi
                optionToValue={({ value }) => value}
                items={[
                  {
                    value: BusinessNotificationFlags.NEW_SHOPPING,
                    label: 'Al crear orden de compra',
                    description:
                      'Le llegarán los detalles (precio, productos y enlace) de las órdenes de compra al ser solicitadas por los clientes.'
                  }
                ]}
                containerClassName="flex items-center flex-wrap gap-4"
              />

              {portal?.getPortal(
                <ButtonSave
                  formuxSubmit
                  className="w-full"
                  isBusy={updateOneBusiness.status.isBusy}
                  onClick={handleSubmit}
                />
              )}
            </form>
          );
        }}
      </Formux>
    </div>
  );
};

export default Component;
