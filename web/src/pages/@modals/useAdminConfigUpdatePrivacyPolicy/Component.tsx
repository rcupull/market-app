import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { Formux } from 'components/formux';

import { useUpdateAdminConfig } from 'features/api/admin/useUpdateAdminConfig';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { AdminConfig } from 'types/admin';

interface State extends Pick<AdminConfig, 'privacyPolicy'> {}

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { data, init } = useAdminConfig();
  const { updateAdminConfig } = useUpdateAdminConfig();
  const { onClose } = useModal();

  return (
    <>
      <Formux<State>
        value={{
          privacyPolicy: data?.privacyPolicy || '',
        }}
      >
        {({ value, isValid }) => {
          return (
            <form className="w-full">
              <FieldCheckEditor
                name="privacyPolicy"
                className="mt-6"
                classNameContainer="max-h-[50vh]"
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateAdminConfig.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    const { privacyPolicy } = value;
                    updateAdminConfig.fetch(
                      {
                        privacyPolicy,
                      },
                      {
                        onAfterSuccess: () => {
                          init();
                          onClose();
                        },
                      },
                    );
                  }}
                  variant="primary"
                  className="w-full"
                />,
              )}
            </form>
          );
        }}
      </Formux>
    </>
  );
};

export default Component;