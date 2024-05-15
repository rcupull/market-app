import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { Formik } from 'components/formik';

import { useAuthSignUp } from 'features/api/auth/useAuthSignUp';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useAuthSignInModal } from '../useAuthSignInModal';

import { BusinessMarketLogo } from 'pages/@common/business-market-logo';

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { authSignUp } = useAuthSignUp();
  const authSignInModal = useAuthSignInModal();
  const { onClose, pushModal } = useModal();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <BusinessMarketLogo className="!size-28" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registrarse
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            canCreateBusiness: false,
          }}
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
            {
              field: 'name',
              type: 'required',
            },
            {
              field: 'confirmPassword',
              type: 'equal',
              equalField: 'password',
            },
          ]}
        >
          {({ handleSubmit, isValid, values, setErrors, errors }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FieldInput id="name" name="name" autoComplete="name" label="Nombre" />

                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo electrónico"
                  className="mt-6"
                />

                <div className="relative">
                  <FieldInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    label="Contraseña"
                    className="mt-6"
                  />
                </div>

                <FieldInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirmar contraseña"
                  className="mt-6"
                />

                <FieldCheckbox
                  name="canCreateBusiness"
                  label="Propietario de negocios"
                  className="mt-6"
                />

                {portal.getPortal(
                  <Button
                    label="Registrarse"
                    isBusy={authSignUp.status.isBusy}
                    disabled={!isValid}
                    onClick={() => {
                      const { email, password, name, canCreateBusiness } = values;
                      authSignUp.fetch(
                        { email, password, name, canCreateBusiness },
                        {
                          onAfterSuccess: () => {
                            onClose();

                            pushModal(
                              'Confirmation',
                              {
                                useProps: () => {
                                  const { onClose } = useModal();

                                  return {
                                    className: 'max-w-lg',
                                    content:
                                      'Se ha registrado exitosamente pero debe confirmar su correo para poder iniciar sesión. Revise el enlace enviado a su correo para confirmar el registro.',
                                    badge: <Badge variant="success" />,
                                    customBtn: (
                                      <Button
                                        label="Entendido"
                                        className="ml-auto"
                                        onClick={() => {
                                          onClose();
                                        }}
                                      />
                                    ),
                                    primaryBtn: <></>,
                                    secondaryBtn: <></>,
                                  };
                                },
                              },
                              { emergent: true },
                            );
                          },
                          onAfterFailed: (e) => {
                            if (e.reazon === 'EMAIL_ALREADY_REGISTERED') {
                              setErrors({
                                ...errors,
                                email: e.message,
                              });
                            }
                          },
                        },
                      );
                    }}
                    className="w-full"
                  />,
                )}

                <div className="w-100 text-sm flex pt-4">
                  <Button
                    variant="link"
                    label="Iniciar sesión"
                    onClick={() => {
                      onClose();
                      setTimeout(() => authSignInModal.open(), 50);
                    }}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
