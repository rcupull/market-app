import { useRef } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useKeyBoard } from 'hooks/useKeyBoard';
import { Portal } from 'hooks/usePortal';
import { useRouter } from 'hooks/useRouter';

import { useAuthSignUpModal } from '../useAuthSignUpModal';

import { BusinessMarketLogo } from 'pages/@common/business-market-logo';
import { getAdminRoute, getDashboardRoute } from 'utils/business';
import { getRequiredLabel } from 'utils/form';
import { isString } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  email?: string;
  redirect?: string | false;
}

export const Component = ({ portal, email = '', redirect }: ComponentProps) => {
  const { authSignIn, getIsUser, getIsAdmin } = useAuth();
  const { pushRoute } = useRouter();
  const { onClose } = useModal();
  const authSignUpModal = useAuthSignUpModal();

  const refPassword = useRef<HTMLInputElement>(null);

  const emailKeyboard = useKeyBoard({
    Enter: (e) => {
      e.preventDefault();
      refPassword.current?.focus();
    },
  });

  const passwordKeyboard = useKeyBoard<{
    handleSubmit: () => void;
  }>({
    Enter: (e, { handleSubmit }) => {
      e.preventDefault();
      handleSubmit();
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <BusinessMarketLogo className="!size-28" />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-10">
        <Formux
          value={{ email, password: '' }}
          validate={[
            {
              field: 'email',
              type: 'required',
            },
            {
              field: 'email',
              type: 'email',
            },
            {
              field: 'password',
              type: 'required',
            },
          ]}
        >
          {({ isValid, value, setErrors }) => {
            const handleSubmit = () => {
              if (!isValid) return;

              const { email, password } = value;

              authSignIn.fetch(
                { email, password },
                {
                  onAfterSuccess: ({ user }) => {
                    if (isString(redirect)) {
                      pushRoute(redirect);
                    } else if (redirect === false) {
                      //NOP
                    } else if (getIsUser(user)) {
                      pushRoute(getDashboardRoute());
                    } else if (getIsAdmin(user)) {
                      pushRoute(getAdminRoute());
                    }

                    onClose();
                  },
                  onAfterFailed: () => {
                    setErrors({
                      email: 'Email o contraseña incorrecta',
                      password: 'Email o contraseña incorrecta',
                    });
                  },
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
                  label={getRequiredLabel('Contraseña')}
                  className="mt-6"
                  {...passwordKeyboard({ handleSubmit })}
                />

                {portal.getPortal(
                  <Button
                    label="Iniciar sesión"
                    isBusy={authSignIn.status.isBusy}
                    disabled={!isValid}
                    onClick={handleSubmit}
                    className="w-full"
                  />
                )}

                <div className="w-100 text-sm pt-4">
                  No tienes una cuenta?{' '}
                  <Button
                    variant="link"
                    className="!inline-block !whitespace-pre-line"
                    label="Regístrate gratis"
                    onClick={() => {
                      onClose();
                      setTimeout(() => authSignUpModal.open(), 50);
                    }}
                  />{' '}
                  para obtener los beneficios de nuestro sistema. También puedes{' '}
                  <Button
                    variant="link"
                    className="!inline-block !whitespace-pre-line"
                    label="saber más de nosotros"
                    onClick={() => {
                      onClose();
                      pushRoute('/about-us');
                    }}
                  />{' '}
                  o darle un vistazo a los{' '}
                  <Button
                    variant="link"
                    className="!inline-block !whitespace-pre-line"
                    label="precios"
                    onClick={() => {
                      onClose();
                      pushRoute('/price');
                    }}
                  />{' '}
                  de nuestros servicios.
                </div>
              </form>
            );
          }}
        </Formux>
      </div>
    </div>
  );
};

export default Component;
