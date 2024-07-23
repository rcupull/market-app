import { useState } from 'react';

import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';
import { HtmlTextContainer } from 'components/html-text-container';
import { QrCode } from 'components/qr-code';
import { SpinnerBox } from 'components/spinner-box';

import { useDebouncer } from 'hooks/useDebouncer';
import { FetchOptions } from 'hooks/useFetch';

import { FetchStatus } from 'types/api';
import { getTelegramUrl } from 'utils/api';
import { cn } from 'utils/general';

interface FormValue {
  code?: string;
}

export interface TelegramActivationStepsProps {
  onFetch: (args: { value: FormValue } & FetchOptions) => void;
  status: FetchStatus;
}

export const TelegramActivationSteps = ({ onFetch, status }: TelegramActivationStepsProps) => {
  const initialValue: FormValue = { code: '' };

  const [state, setState] = useState<FormValue>(initialValue);
  const [error, setError] = useState(false);

  const debouncer = useDebouncer();

  return (
    <Formux<FormValue>
      value={state}
      onChange={(newState) => {
        setError(false);

        debouncer(() => {
          if (!newState.code) return;
          if (newState.code.length < 4) return;

          onFetch({
            value: newState,
            onAfterSuccess: () => {
              setState(initialValue);
            },
            onAfterFailed: () => {
              setError(true);
            },
          });
        }, 500);

        setState(newState);
      }}
    >
      {() => {
        return (
          <form className="mt-4">
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
                  <span className="font-bold">no aparezca</span> dicho botón envie un mensaje con el
                  texto <span className="font-bold">&quot;/start&quot;</span>
                </li>

                <li className="mt-4">
                  Copie el código enviado a su cuenta de Telegram, péguelo en el campo siguiente y
                  de click en <span className="font-bold">Activar</span>.
                </li>

                <div className="relative">
                  <FieldInput
                    name="code"
                    label="Código de activación"
                    placeholder="Escriba el código de activación"
                    className={cn('mt-4')}
                    typeOnlyNumbers
                    error={error && 'Por favor, proporcione un código válido'}
                  />
                  {status.isBusy && <SpinnerBox className="mt-10" />}
                </div>
              </ol>
            </HtmlTextContainer>
          </form>
        );
      }}
    </Formux>
  );
};
