import { useState } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuthForgotPasswordValidate } from 'features/api/auth/useAuthForgotPasswordValidate';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { usePortal } from 'hooks/usePortal';
import { useRouter } from 'hooks/useRouter';

import { Formik } from 'formik';
import SvgCheckCircle from 'icons/CheckCircle';
import { BusinessMarketLogo } from 'pages/@common/business-market-logo';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';

export const ForgotPassword = () => {
  const { params } = useRouter();

  const { authForgotPasswordValidate } = useAuthForgotPasswordValidate();
  const authSignInModal = useAuthSignInModal();
  const { code } = params;

  const [email, setEmail] = useState<string>();
  const portal = usePortal();

  const getFormErrors = useGetFormErrors();

  const sucessContent = (
    <>
      <SvgCheckCircle className="size-20 bg-green-100 fill-green-500 rounded-full p-1" />

      <span className="text-2xl font-semibold text-center">
        La contraseña fue restablecida correctamente{' '}
      </span>

      <Button
        label="Iniciar sesión"
        onClick={() => authSignInModal.open({ email })}
        className="!mt-8 !text-lg"
      />
    </>
  );

  const processContent = (
    <>
      <div>
        <div className="flex justify-center">
          <BusinessMarketLogo className="!size-28" />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Restablecer contraseña
        </h2>
      </div>

      <div className="mt-10 w-full">
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
                  id="email"
                  name="newPasswordAgain"
                  type="password"
                  label="Repetir contraseña"
                  className="mt-6"
                />

                {portal.getPortal(
                  <Button
                    label="Restablecer"
                    isBusy={authForgotPasswordValidate.status.isBusy}
                    disabled={!isValid}
                    onClick={() => {
                      if (!code) return;

                      const { newPassword } = values;

                      authForgotPasswordValidate.fetch(
                        { code, newPassword },
                        {
                          onAfterSuccess: ({ email }) => {
                            setEmail(email);
                          },
                        },
                      );
                    }}
                    className="w-full mt-6"
                  />,
                )}
              </form>
            );
          }}
        </Formik>
        <div ref={portal.ref} />,
      </div>
    </>
  );

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-[30rem]">
        {email ? sucessContent : processContent}
      </div>
    </div>
  );
};
