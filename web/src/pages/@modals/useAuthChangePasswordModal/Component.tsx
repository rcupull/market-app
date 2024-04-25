import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuthChangePassword } from 'features/api/auth/useAuthChangePassword';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { Portal } from 'hooks/usePortal';

import { Formik } from 'formik';

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { onClose } = useModal();
  const { authChangePassword } = useAuthChangePassword();

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
          Cambia tu contraseña
        </h2>
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{ newPassword: '', newPasswordAgain: '' }}
          onSubmit={() => {}}
          validate={(values) => {
            return getFormErrors(values, [
              {
                field: 'newPassword',
                type: 'required',
              },
              {
                field: 'newPasswordAgain',
                type: 'equal',
                equalField: 'newPassword',
                message: 'Las dos contraseña deben ser iguales',
              },
            ]);
          }}
        >
          {({ handleSubmit, isValid, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FieldInput
                  id="email"
                  name="newPassword"
                  type="password"
                  label="Nueva contraseña"
                />

                <FieldInput
                  id="password"
                  name="newPasswordAgain"
                  type="password"
                  label="Repetir contraseña"
                  className="mt-6"
                />

                {portal.getPortal(
                  <Button
                    label="Cambiar contraseña"
                    isBusy={authChangePassword.status.isBusy}
                    disabled={!isValid}
                    onClick={() => {
                      const { newPassword } = values;

                      authChangePassword.fetch(
                        { newPassword },
                        {
                          onAfterSuccess: () => {
                            onClose();
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
