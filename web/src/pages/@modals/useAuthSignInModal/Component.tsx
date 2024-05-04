import { useRef } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useKeyBoard } from 'hooks/useKeyBoard';
import { Portal } from 'hooks/usePortal';
import { useRouter } from 'hooks/useRouter';

import { useAuthSignUpModal } from '../useAuthSignUpModal';

import { Formik } from 'formik';
import { getDashboardRoute } from 'utils/business';

export interface ComponentProps {
  portal: Portal;
  email?: string;
  redirect?: string;
}

export const Component = ({ portal, email = '', redirect }: ComponentProps) => {
  const { authSignIn, getIsUser } = useAuth();
  const { pushRoute } = useRouter();
  const { onClose } = useModal();
  const authSignUpModal = useAuthSignUpModal();

  const getFormErrors = useGetFormErrors();

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
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{ email, password: '' }}
          onSubmit={() => {}}
          validate={(values) => {
            return getFormErrors(values, [
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
            ]);
          }}
        >
          {({ isValid, values }) => {
            const handleSubmit = () => {
              if (!isValid) return;

              const { email, password } = values;

              authSignIn.fetch(
                { email, password },
                {
                  onAfterSuccess: ({ user }) => {
                    if (redirect) {
                      pushRoute(redirect);
                    } else if (getIsUser(user)) {
                      pushRoute(getDashboardRoute());
                    }

                    onClose();
                  },
                },
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
                  label="Correo Electrónico"
                  {...emailKeyboard()}
                />

                <FieldInput
                  ref={refPassword}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus={!!email}
                  label="Contraseña"
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
                  />,
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
                  o darle un vistazo al{' '}
                  <Button
                    variant="link"
                    className="!inline-block !whitespace-pre-line"
                    label="precios"
                    onClick={() => {
                      onClose();
                      pushRoute('/price');
                    }}
                  />
                  de nuestros servicios.
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
