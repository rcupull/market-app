import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAuthSignUp } from 'features/api/auth/useAuthSignUp';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useAuthSignInModal } from '../useAuthSignInModal';
import { useTermsAndConditionsModal } from '../useTermsAndConditionsModal';

import { BusinessMarketBrand } from 'pages/@common/business-market-brand';
import { getRequiredLabel } from 'utils/form';
import { cn } from 'utils/general';
import { getStrongPasswordTracking } from 'utils/password';

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { authSignUp } = useAuthSignUp();
  const authSignInModal = useAuthSignInModal();
  const { onClose, pushModal } = useModal();
  const termsAndConditionsModal = useTermsAndConditionsModal();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <BusinessMarketBrand />
        </div>
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
            termsAndConditionsAccepted: false,
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
            {
              field: 'termsAndConditionsAccepted',
              type: 'custom',
              customCb: (value) => value,
              message: 'Debe aceptar los Términos y Condiciones',
            },
          ]}
        >
          {({ value, setErrors, errors }) => {
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

                <FieldCheckbox
                  name="termsAndConditionsAccepted"
                  label={
                    <>
                      Acepto los{' '}
                      <Button
                        variant="link"
                        preventDefault
                        onClick={() => termsAndConditionsModal.open()}
                        label="Términos y Condiciones"
                        className={cn('!inline-block')}
                      />
                    </>
                  }
                  className="mt-6"
                />

                {portal.getPortal(
                  <Button
                    label="Registrarse"
                    formuxSubmit
                    isBusy={authSignUp.status.isBusy}
                    onClick={() => {
                      const { email, password, name } = value;
                      authSignUp.fetch(
                        { email, password, name },
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
                              { emergent: true }
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
                        }
                      );
                    }}
                    className="w-full"
                  />
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

export default Component;
