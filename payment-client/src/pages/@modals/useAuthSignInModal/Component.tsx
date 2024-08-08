import { useRef } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useBreakpoints } from 'hooks/useBreakpoints';
import { useKeyBoard } from 'hooks/useKeyBoard';
import { Portal } from 'hooks/usePortal';
import { useRouter } from 'hooks/useRouter';

import { BusinessMarketBrand } from 'pages/@common/business-market-brand';
import { getRequiredLabel } from 'utils/form';
import { isString } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  email?: string;
  redirect?: string | false;
}

export const Component = ({ portal, email = '', redirect }: ComponentProps) => {
  const { authSignIn } = useAuth();
  const { pushRoute } = useRouter();
  const { onClose } = useModal();
  const breakpoints = useBreakpoints();
  const refPassword = useRef<HTMLInputElement>(null);

  const emailKeyboard = useKeyBoard({
    Enter: (e) => {
      e.preventDefault();
      refPassword.current?.focus();
    }
  });

  const passwordKeyboard = useKeyBoard<{
    handleSubmit: () => void;
  }>({
    Enter: (e, { handleSubmit }) => {
      e.preventDefault();
      handleSubmit();
    }
  });

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          {breakpoints.xs ? <BusinessMarketBrand className="!size-32" /> : <BusinessMarketBrand />}
        </div>
        <h2 className="mt-0 sm:mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-4 sm:mt-10">
        <Formux
          value={{ email, password: '' }}
          validate={[
            {
              field: 'email',
              type: 'required'
            },
            {
              field: 'email',
              type: 'email'
            },
            {
              field: 'password',
              type: 'required'
            }
          ]}
        >
          {({ value, setErrors }) => {
            const handleSubmit = () => {
              const { email, password } = value;

              authSignIn.fetch(
                { email, password },
                {
                  onAfterSuccess: () => {
                    onClose();

                    if (isString(redirect)) {
                      return pushRoute(redirect);
                    }
                  },
                  onAfterFailed: () => {
                    setErrors({
                      email: ' ',
                      password: ' '
                    });
                  }
                }
              );
            };
            return (
              <form>
                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  autoFocusDelay={300}
                  label={getRequiredLabel('Correo Electrónico')}
                  {...emailKeyboard()}
                />

                <FieldInput
                  ref={refPassword}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus={!!email}
                  autoFocusDelay={300}
                  label={getRequiredLabel('Contraseña')}
                  className="mt-4 sm:mt-6"
                  {...passwordKeyboard({ handleSubmit })}
                />

                {portal.getPortal(
                  <Button
                    formuxSubmit
                    label="Iniciar sesión"
                    isBusy={authSignIn.status.isBusy}
                    onClick={handleSubmit}
                    className="w-full"
                  />
                )}
              </form>
            );
          }}
        </Formux>
      </div>
    </div>
  );
};

export default Component;
