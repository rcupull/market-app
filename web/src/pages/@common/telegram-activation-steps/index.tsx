import { Button, ButtonProps } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';
import { HtmlTextContainer } from 'components/html-text-container';
import { QrCode } from 'components/qr-code';

import { useKeyBoard } from 'hooks/useKeyBoard';
import { Portal } from 'hooks/usePortal';

import { getTelegramUrl } from 'utils/api';

interface FormValue {
  code?: string;
}

export interface TelegramActivationStepsProps {
  getSubmitBtnProps?: (args: { value: FormValue; resetForm: () => void }) => Partial<ButtonProps>;
  portal?: Portal;
  value?: FormValue;
  onChange?: (newValue: FormValue) => void;
}

export const TelegramActivationSteps = ({
  getSubmitBtnProps,
  portal,
  ...omittedProps
}: TelegramActivationStepsProps) => {
  const codeKeyboard = useKeyBoard<{
    handleSubmit: () => void;
  }>({
    Enter: (e, { handleSubmit }) => {
      e.preventDefault();
      handleSubmit();
    },
  });

  return (
    <HtmlTextContainer>
      <ol className="mt-4 text-left">
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

        <Formux<FormValue>
          value={{
            code: '',
          }}
          {...omittedProps}
        >
          {({ value, resetForm }) => {
            const overrydeBtnProps = getSubmitBtnProps?.({ value, resetForm }) || {};

            return (
              <form className="mt-4">
                <FieldInput
                  name="code"
                  label="Código de activación"
                  placeholder="Escriba el código de activación"
                  {...codeKeyboard({
                    handleSubmit: () => {
                      //@ts-expect-error ignore the click event in this input
                      overrydeBtnProps.onClick?.();
                    },
                  })}
                />

                {portal?.getPortal(
                  <Button formuxSubmit label="Activar" className="w-full" {...overrydeBtnProps} />
                )}
              </form>
            );
          }}
        </Formux>
      </ol>
    </HtmlTextContainer>
  );
};
