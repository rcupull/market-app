import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { FieldInput } from 'components/field-input';
import { FieldToggleButton } from 'components/field-toggle-button';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { BusinessAboutUsPage } from 'types/business';

interface State extends BusinessAboutUsPage {}

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

  const { routeName } = business;

  return (
    <>
      <Formik<State>
        initialValues={{
          visible: business?.aboutUsPage?.visible || false,
          title: business?.aboutUsPage?.title || '',
          description: business?.aboutUsPage?.description || '',
        }}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({ values, isValid }) => {
          return (
            <form className="w-full">
              <FieldToggleButton label="Visible" name="visible" />

              <FieldInput label="Título de la página" name="title" className="mt-6" />

              <FieldCheckEditor
                label="Descripción"
                name="description"
                className="mt-6"
                classNameContainer="max-h-[50vh]"
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    updateOneBusiness.fetch(
                      {
                        update: {
                          aboutUsPage: values,
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
