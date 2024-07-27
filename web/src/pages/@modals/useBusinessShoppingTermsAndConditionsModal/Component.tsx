import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useCloseContext } from 'features/modal/components/emergent/closeContext/useCloseContext';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

interface State {
  termsAndConditions: string;
}

export interface ComponentProps {
  portal: Portal;
}
export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const { routeName = '', shoppingMeta = {} } = business != null ? business : {};

  const { onChangeUnsavedChanges } = useCloseContext();

  if (!business) {
    return <></>;
  }

  return (
    <>
      <Formux<State>
        value={{
          termsAndConditions: shoppingMeta.termsAndConditions || '',
        }}
      >
        {({ value, hasChange }) => {
          onChangeUnsavedChanges(hasChange);

          return (
            <form className="w-full">
              <FieldCheckEditor
                name="termsAndConditions"
                className="mt-6"
                checkEditorProps={{
                  className: 'check-editor-max-h-50vh check-editor-min-h-40vh',
                }}
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  formuxSubmit
                  onClick={() => {
                    const { termsAndConditions } = value;
                    updateOneBusiness.fetch(
                      {
                        update: {
                          shoppingMeta: {
                            ...shoppingMeta,
                            termsAndConditions,
                          },
                        },
                        routeName,
                      },
                      {
                        onAfterSuccess: () => {
                          onFetch({ routeName });
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
