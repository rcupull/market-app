import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
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

      <ol className="mt-4 text-left">
        <Divider />
        <li>
          De click en el enlace o escanee el QR siguiente.
          <div className="flex flex-col items-center gap-4 mt-4">
            <a href={getTelegramUrl()} target="_blank" rel="noreferrer">
              {getTelegramUrl()}
            </a>

            <QrCode value={getTelegramUrl()} className="size-40" />
          </div>
        </li>

        <li className="mt-4">
          De click sobre el botón <span className="font-bold">Iniciar</span>. En caso de que{' '}
          <span className="font-bold">no aparezca</span> dicho botón envie un mensaje con el texto{' '}
          <span className="font-bold">&quot;/start&quot;</span>
        </li>

        <li className="mt-4">
          Copie el código enviado a su cuenta de Telegram, péguelo en el campo siguiente y de click
          en <span className="font-bold">Activar</span>.
        </li>

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
          {({ value, isValid, resetForm, hasChange }) => {
            return (
              <form className="mt-4">
                <FieldInput
                  name="code"
                  label="Código de activación"
                  placeholder="Escriba el código de activación"
                />

                {portal.getPortal(
                  <Button
                    label="Activar"
                    hasChange={hasChange}
                    disabled={!isValid}
                    className="w-full"
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
      </ol>
    </HtmlTextContainer>
  );
};

export default Component;