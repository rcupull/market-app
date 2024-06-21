import { Badge } from 'components/badge';
import { Divider } from 'components/divider';

import { useBusinessChatBotValidate } from 'features/api/business/useBusinessChatBotValidate';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { TelegramActivationSteps } from 'pages/@common/telegram-activation-steps';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { businessChatBotValidate } = useBusinessChatBotValidate();

  const { telegramBotChat } = business || {};

  return (
    <div>
      {telegramBotChat ? (
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
      ) : (
        <>
          Nuestra plataforma utiliza Telegram para mantenerlo actualizado del estado de sus
          negocios, órdenes de compra y otras informaciones importantes. Continue los siguientes
          pasos para{' '}
          <span className="font-bold">activar su cuenta de Telegram en este negocio</span>.
        </>
      )}

      <Divider />
      <TelegramActivationSteps
        portal={portal}
        getSubmitBtnProps={({ resetForm, value }) => ({
          isBusy: businessChatBotValidate.status.isBusy,
          onClick: () => {
            if (!business) return;
            const { code } = value;
            const { routeName } = business;

            businessChatBotValidate.fetch(
              { code, routeName },
              {
                onAfterSuccess: () => {
                  resetForm();
                  onAfterSuccess?.();
                },
              },
            );
          },
        })}
      />
    </div>
  );
};

export default Component;
