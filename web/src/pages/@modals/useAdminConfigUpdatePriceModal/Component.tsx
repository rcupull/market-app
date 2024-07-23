import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { Formux } from 'components/formux';

import { useUpdateConfigAdmin } from 'features/api/admin/useUpdateConfigAdmin';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { AdminConfig } from 'types/admin';

interface State extends Pick<AdminConfig, 'price'> {}

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
          price: data?.price || '',
        }}
      >
        {({ value }) => {
          return (
            <form className="w-full">
              <FieldCheckEditor
                name="price"
                className="mt-6"
                checkEditorProps={{
                  className: 'check-editor-max-h-65vh',
                }}
              />

              {portal.getPortal(
                <Button
                  formuxSubmit
                  label="Guardar"
                  isBusy={updateConfigAdmin.status.isBusy}
                  onClick={() => {
                    const { price } = value;
                    updateConfigAdmin.fetch(
                      {
                        price,
                      },
                      {
                        onAfterSuccess: () => {
                          init();
                          onClose();
                        },
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
