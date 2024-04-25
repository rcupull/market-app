import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuthForgotPasswordRequest } from 'features/api/auth/useAuthForgotPasswordRequest';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { Portal } from 'hooks/usePortal';

import { Formik } from 'formik';

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { onClose, pushModal } = useModal();
  const { authForgotPasswordRequest } = useAuthForgotPasswordRequest();

  const getFormErrors = useGetFormErrors();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enviar código de verificación
        </h2>
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{ email: '' }}
          onSubmit={() => {}}
          validate={(values) => {
            return getFormErrors(values, [
              {
                field: 'email',
                type: 'email',
              },
              {
                field: 'email',
                type: 'required',
              },
            ]);
          }}
        >
          {({ handleSubmit, isValid, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FieldInput id="email" name="email" type="email" label="Correo electrónico" />

                {portal.getPortal(
                  <Button
                    label="Enviar"
                    isBusy={authForgotPasswordRequest.status.isBusy}
                    disabled={!isValid}
                    onClick={() => {
                      const { email } = values;

                      authForgotPasswordRequest.fetch(
                        { email },
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
                                    secondaryBtn: <></>,
                                  };
                                },
                              },
                              { emergent: true },
                            );
                          },
                        },
                      );
                    }}
                    className="w-full"
                  />,
                )}
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
