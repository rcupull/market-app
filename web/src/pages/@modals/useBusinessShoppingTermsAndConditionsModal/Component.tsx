import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
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

  if (!business) {
    return <></>;
  }

  const { routeName, shoppingMeta = {} } = business;

  return (
    <>
      <Formux<State>
        value={{
          termsAndConditions: shoppingMeta.termsAndConditions || '',
        }}
      >
        {({ value, isValid }) => {
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
                  disabled={!isValid}
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
