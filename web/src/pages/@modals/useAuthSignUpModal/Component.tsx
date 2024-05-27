import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAuthSignUp } from 'features/api/auth/useAuthSignUp';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useAuthSignInModal } from '../useAuthSignInModal';

import { BusinessMarketLogo } from 'pages/@common/business-market-logo';
import { getRequiredLabel } from 'utils/form';
import { getStrongPasswordTracking } from 'utils/password';

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
        <Formux
          value={{
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
              field: 'password',
              type: 'custom',
              customCb: (value) => getStrongPasswordTracking(value).valid,
              message: 'Contraseña inválida',
            },
            {
              field: 'name',
              type: 'required',
            },
            {
              field: 'confirmPassword',
              type: 'required',
            },
            {
              field: 'confirmPassword',
              type: 'equal',
              equalField: 'password',
              message: 'Las dos contraseña deben ser iguales',
            },
          ]}
        >
          {({ isValid, value, setErrors, errors }) => {
            return (
              <form>
                <FieldInput
                  id="name"
                  name="name"
                  autoComplete="name"
                  label={getRequiredLabel('Nombre')}
                />

                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label={getRequiredLabel('Correo electrónico')}
                  className="mt-6"
                />

                <div className="relative">
                  <FieldInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    label={getRequiredLabel('Contraseña')}
                    className="mt-6"
                  />

                  <div className="mt-3">
                    {getStrongPasswordTracking(value.password).trackingNode}
                  </div>
                </div>

                <FieldInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label={getRequiredLabel('Confirmar contraseña')}
                  className="mt-6"
                />

                <div className="flex flex-col bg-red-100 mt-10 p-5 rounded-sm">
                  <span className="text-sm">
                    Regístrese como propietario de negocios marcando la siguiente casilla:
                  </span>
                  <FieldCheckbox
                    name="canCreateBusiness"
                    label="Propietario de negocios"
                    description={
                      <div>
                        Los propietarios de negocios pueden crear negocios en nuestro sistema y
                        publicar los productos que comercializan. Si usted no tiene productos para
                        comercializar a través de Asere Market no necesita marcar esta opción.
                      </div>
                    }
                    className="mt-2"
                  />
                </div>

                {portal.getPortal(
                  <Button
                    label="Registrarse"
                    isBusy={authSignUp.status.isBusy}
                    disabled={!isValid}
                    onClick={() => {
                      const { email, password, name, canCreateBusiness } = value;
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
        </Formux>
      </div>
    </div>
  );
};
