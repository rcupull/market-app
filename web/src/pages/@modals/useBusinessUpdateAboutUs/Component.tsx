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
              <FieldToggleButton
                label="Visible"
                name="visible"
                description={
                  <div>
                    La página de presentacion se muestra en conjunto con la de las publicaciones y
                    tiene como objetivo personalizar una descripcion, comentarios o reseñas que
                    usted necesite mostrar sobre su negocio. Si no necesita de este espacio
                    desactive este campo para no mostrar la página.
                  </div>
                }
              />

              <FieldInput label="Título de la página" name="title" className="mt-6" />

              <FieldCheckEditor
                label="Descripción"
                name="description"
                className="mt-6"
                classNameContainer="max-h-[50vh]"
                description={
                  <div>
                    En este módulo usted puede formular un texto enriquecido que se mostrará en la
                    página de presentacion.
                    <br />
                    <br />
                    <span className="italic">
                      Nota: Las ampliación de las funcionalidades de este módulo estan en desarrollo, para incorporar imágenes y otros formatos de texto.
                    </span>
                  </div>
                }
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
