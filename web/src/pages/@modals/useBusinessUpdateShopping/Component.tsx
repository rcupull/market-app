import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';
import { HtmlTextContainer } from 'components/html-text-container';
import { QrCode } from 'components/qr-code';

import { useBusinessChatBotValidate } from 'features/api/business/useBusinessChatBotValidate';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { getTelegramUrl } from 'utils/api';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { businessChatBotValidate } = useBusinessChatBotValidate();

  const { telegramBotChat } = business || {};

  return (
    <HtmlTextContainer>
      Todas las notificaciones de nustra plataforma se envian usando nuestro bot de Telegram. El
      cual debe activar para poder recibirlas.
      {telegramBotChat && (
        <div className="flex gap-6 font-bold my-8 ring ring-green-400 rounded-xl p-2">
          <Badge variant="success" />
          Este negocio ya tiene una cuanta de telegram activa y no es necesario hacerlo nuevamente.
          Si necesita cambiar la cuenta de telegram de este negocio entonces continue los siguientes
          pasos.
        </div>
      )}
      <h3 className="mt-4">
        1. Si tiene <span className="font-bold">varias cuentas</span> de Telegram en su dispositivo
        asegúrese de que la cuenta activa es la que desea asociar a este negocio.
      </h3>
      <h3 className="mt-4">2. De click en el siguiente enlace o escanear el QR continuación.</h3>
      <div className="flex flex-col items-center gap-4 mt-4">
        <a href={getTelegramUrl()} target="_blank" rel="noreferrer">
          {getTelegramUrl()}
        </a>

        <QrCode value={getTelegramUrl()} className="size-40" />
      </div>
      <h3 className="mt-4">
        3. Inicie el chat bot en el botón <span className="font-bold">Iniciar</span> o enviando un
        mensaje con el texto <span className="font-bold">/start</span>{' '}
      </h3>
      <h3 className="mt-4">
        4. Use el código enviado a su cuenta para activar el chatbot en este negocio.
      </h3>
      <Formux
        value={{
          code: '',
        }}
        validate={[
          {
            field: 'code',
            type: 'required',
          },
        ]}
      >
        {({ value, isValid, resetForm }) => {
          return (
            <form className="mt-10">
              <FieldInput
                name="code"
                label="Código de activación"
                placeholder="Escriba el código de activación"
              />

              {portal.getPortal(
                <Button
                  label="Activar"
                  disabled={!isValid}
                  onClick={() => {
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
                  }}
                />,
              )}
            </form>
          );
        }}
      </Formux>
    </HtmlTextContainer>
  );
};
