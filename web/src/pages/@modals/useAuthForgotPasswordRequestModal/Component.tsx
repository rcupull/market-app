import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAuthForgotPasswordRequest } from 'features/api/auth/useAuthForgotPasswordRequest';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { BusinessMarketBrand } from 'pages/@common/business-market-brand';
import { getRequiredLabel } from 'utils/form';

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { onClose, pushModal } = useModal();
  const { authForgotPasswordRequest } = useAuthForgotPasswordRequest();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <BusinessMarketBrand />
        </div>

        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enviar código de verificación
        </h2>
      </div>

      <div className="mt-10">
        <Formux
          value={{ email: '' }}
          validate={[
            {
              field: 'email',
              type: 'required'
            },
            {
              field: 'email',
              type: 'email'
            }
          ]}
        >
          {({ value }) => {
            return (
              <form>
                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  label={getRequiredLabel('Correo electrónico')}
                />

                {portal.getPortal(
                  <Button
                    label="Enviar"
                    isBusy={authForgotPasswordRequest.status.isBusy}
                    formuxSubmit
                    onClick={() => {
                      const { email } = value;

                      authForgotPasswordRequest.fetch(
                        { email },
                        {
                          onAfterSuccess: () => {
                            onClose();

                            pushModal('Confirmation', {
                              useProps: () => {
                                const { onClose } = useModal();

                                return {
                                  className: 'max-w-lg',
                                  content:
                                    'Se ha enviado un enlace de verificación a su correo. Por favor revise su bandeja de entrada.',
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
                                  secondaryBtn: <></>
                                };
                              }
                            });
                          }
                        }
                      );
                    }}
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
