import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { Formux } from 'components/formux';

import { useUpdateConfigAdmin } from 'features/api/admin/useUpdateConfigAdmin';
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
  const { updateConfigAdmin } = useUpdateConfigAdmin();
  const { onClose } = useModal();

  return (
    <>
      <Formux<State>
        value={{
          privacyPolicy: data?.privacyPolicy || ''
        }}
      >
        {({ value }) => {
          return (
            <form className="w-full">
              <FieldCheckEditor
                name="privacyPolicy"
                className="mt-6"
                checkEditorProps={{
                  className: 'check-editor-max-h-65vh'
                }}
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateConfigAdmin.status.isBusy}
                  formuxSubmit
                  onClick={() => {
                    const { privacyPolicy } = value;
                    updateConfigAdmin.fetch(
                      {
                        privacyPolicy
                      },
                      {
                        onAfterSuccess: () => {
                          init();
                          onClose();
                        }
                      }
                    );
                  }}
                  variant="primary"
                  className="w-full"
                />
              )}
            </form>
          );
        }}
      </Formux>
    </>
  );
};

export default Component;
