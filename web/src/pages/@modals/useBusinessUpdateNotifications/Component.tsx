import { useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';

import { useBusinessChatBotValidate } from 'features/api/business/useBusinessChatBotValidate';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { TelegramActivationSteps } from 'pages/@common/telegram-activation-steps';
import { Business, BusinessNotificationFlags } from 'types/business';
import { isEmpty, isEqual } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

interface State extends Pick<Business, 'notificationFlags'> {
  code?: string;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { businessChatBotValidate } = useBusinessChatBotValidate();
  const { updateOneBusiness } = useUpdateOneBusiness();

  const initialState: State = {
    notificationFlags: business?.notificationFlags,
    code: '',
  };
  const [state, setState] = useState<State>(initialState);

  const { telegramBotChat } = business || {};

  return (
    <div>
      Nuestra plataforma utiliza Telegram para mantenerlo actualizado del estado de sus negocios,
      órdenes de compra y otras informaciones importantes.
      <Divider />
      <Formux<State> value={state} onChange={setState}>
        {() => {
          return (
            <form>
              <FieldRadioGroup<{
                value: BusinessNotificationFlags;
                label: string;
                description: string;
              }>
                label="Recibir notificaciones:"
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
                    value: BusinessNotificationFlags.TELEGRAM_NEW_SHOPPING,
                    label: 'Al crear orden de compra',
                    description:
                      'Le llegarán los detalles (precio, productos y enlace) de las ordenes de compra al ser solicitadas por los clientes.',
                  },
                ]}
                containerClassName="flex items-center flex-wrap gap-4"
              />
            </form>
          );
        }}
      </Formux>
      <Divider />
      {!isEmpty(state.notificationFlags) && !telegramBotChat && (
        <div className="text-red-500 ring ring-red-400 rounded-xl p-2">
          Es importante que continue los siguientes pasos para{' '}
          <span className="font-bold">
            activar su cuenta de Telegram en este negocio y poder recibir las notificaciones
          </span>
        </div>
      )}
      {telegramBotChat && (
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-6 ring ring-green-400 rounded-xl p-2">
            <Badge variant="success" />

            <div>
              Este negocio ya posee una cuenta de Telegram activa con el usuario{' '}
              <span className="font-bold">{`${telegramBotChat.firstName}.`}</span> Continue los
              siguientes pasos <span className="font-bold">solo si desea cambiar</span> la cuenta de
              Telegram vinculada con este negocio.
            </div>
          </div>
        </div>
      )}
      <TelegramActivationSteps value={state} onChange={setState} />
      {portal?.getPortal(
        <Button
          label="Activar"
          className="w-full"
          hasChange={!isEqual(state, initialState)}
          onClick={() => {
            if (!business) return;
            const { code, notificationFlags } = state;
            const { routeName } = business;

            updateOneBusiness.fetch(
              {
                routeName: business.routeName,
                update: {
                  notificationFlags,
                },
              },
              {
                onAfterSuccess: () => {
                  onAfterSuccess?.();
                },
              },
            );

            if (code) {
              businessChatBotValidate.fetch({ code, routeName });
            }
          }}
        />,
      )}
    </div>
  );
};

export default Component;
