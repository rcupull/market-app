import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';

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
      <Formik<State>
        initialValues={{
          purchaseRequestTopInfo: shoppingMeta.purchaseRequestTopInfo || '',
        }}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({ values, isValid }) => {
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
                    const { purchaseRequestTopInfo } = values;
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
      </Formik>
    </>
  );
};
