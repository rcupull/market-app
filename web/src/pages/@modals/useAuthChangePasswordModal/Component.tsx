import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAuthChangePassword } from 'features/api/auth/useAuthChangePassword';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { BusinessMarketBrand } from 'pages/@common/business-market-brand';
import { getRequiredLabel } from 'utils/form';
import { getStrongPasswordTracking } from 'utils/password';

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { onClose } = useModal();
  const { authChangePassword } = useAuthChangePassword();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <BusinessMarketBrand />
        </div>

        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cambia tu contraseña
        </h2>
      </div>

      <div className="mt-10">
        <Formux
          value={{ newPassword: '', newPasswordAgain: '' }}
          validate={[
            {
              field: 'newPassword',
              type: 'required',
            },
            {
              field: 'newPassword',
              type: 'custom',
              customCb: (value) => getStrongPasswordTracking(value).valid,
              message: 'Contraseña inválida',
            },
            {
              field: 'newPasswordAgain',
              type: 'required',
            },
            {
              field: 'newPasswordAgain',
              type: 'equal',
              equalField: 'newPassword',
              message: 'Las dos contraseña deben ser iguales',
            },
          ]}
        >
          {({ value }) => {
            return (
              <form>
                <FieldInput
                  id="email"
                  name="newPassword"
                  type="password"
                  label={getRequiredLabel('Nueva contraseña')}
                />

                <div className="mt-3">
                  {getStrongPasswordTracking(value.newPassword).trackingNode}
                </div>

                <FieldInput
                  id="password"
                  name="newPasswordAgain"
                  type="password"
                  label={getRequiredLabel('Repetir contraseña')}
                  className="mt-6"
                />

                {portal.getPortal(
                  <Button
                    label="Cambiar contraseña"
                    isBusy={authChangePassword.status.isBusy}
                    formuxSubmit
                    onClick={() => {
                      const { newPassword } = value;

                      authChangePassword.fetch(
                        { newPassword },
                        {
                          onAfterSuccess: () => {
                            onClose();
                          },
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
