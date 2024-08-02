import { useState } from 'react';

import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';
import { HighlightedBox } from 'components/highlighted-box';

import { useBusinessChatBotValidate } from 'features/api/business/useBusinessChatBotValidate';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { TelegramActivationSteps } from 'pages/@common/telegram-activation-steps';
import { Business, BusinessNotificationFlags } from 'types/business';
import { isEmpty } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

interface State extends Pick<Business, 'notificationFlags'> {}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business, onFetch } = useBusiness();

  const { businessChatBotValidate } = useBusinessChatBotValidate();
  const { updateOneBusiness } = useUpdateOneBusiness();

  const initialState: State = {
    notificationFlags: business?.notificationFlags,
  };
  const [state, setState] = useState<State>(initialState);

  const { telegramBotChat, routeName } = business || {};

  const hasEnabledSomeNotification = !isEmpty(state.notificationFlags);

  return (
    <div>
      Nuestra plataforma utiliza Telegram para mantenerlo actualizado del estado de sus negocios,
      órdenes de compra y otras informaciones importantes.
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
                  notificationFlags,
                },
              },
              {
                onAfterSuccess: () => {
                  onAfterSuccess?.();
                },
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
                      'Le llegarán los detalles (precio, productos y enlace) de las órdenes de compra al ser solicitadas por los clientes.',
                  },
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
      {hasEnabledSomeNotification && (
        <>
          <Divider />
          {telegramBotChat ? (
            <HighlightedBox variant="success">
              <div>
                Este negocio ya posee una cuenta de Telegram activa con el usuario{' '}
                <span className="font-bold">{`${telegramBotChat.firstName}.`}</span> Continúe los
                siguientes pasos <span className="font-bold">solo si desea cambiar</span> la cuenta
                de Telegram vinculada con este negocio.
              </div>
            </HighlightedBox>
          ) : (
            <HighlightedBox variant="warning">
              <div className="text-center sm:text-left">
                Es importante que continue los siguientes pasos para{' '}
                <span className="font-bold">
                  activar su cuenta de Telegram en este negocio y poder recibir las notificaciones
                </span>
              </div>
            </HighlightedBox>
          )}
          <TelegramActivationSteps
            status={businessChatBotValidate.status}
            onFetch={(formArgs) => {
              const { code } = formArgs.value;

              if (code && routeName) {
                businessChatBotValidate.fetch(
                  { code, routeName },
                  {
                    onAfterSuccess: (response) => {
                      formArgs.onAfterSuccess?.(response);

                      business && onFetch({ routeName: business?.routeName });
                    },
                    onAfterFailed: formArgs.onAfterFailed,
                  }
                );
              }
            }}
          />
        </>
      )}
      <Divider />
    </div>
  );
};

export default Component;
