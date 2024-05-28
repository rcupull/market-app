import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

interface State {
  purchaseRequestTopInfo: string;
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
          purchaseRequestTopInfo: shoppingMeta.purchaseRequestTopInfo || '',
        }}
      >
        {({ value, isValid }) => {
          return (
            <form className="w-full">
              <FieldCheckEditor
                name="purchaseRequestTopInfo"
                className="mt-6"
                classNameContainer="max-h-[50vh]"
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    const { purchaseRequestTopInfo } = value;
                    updateOneBusiness.fetch(
                      {
                        update: {
                          shoppingMeta: {
                            ...shoppingMeta,
                            purchaseRequestTopInfo,
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
