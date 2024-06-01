import { Button } from 'components/button';
import { FieldCheckEditor } from 'components/field-check-editor';
import { FieldInput } from 'components/field-input';
import { FieldToggleButton } from 'components/field-toggle-button';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

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
      <Formux<State>
        value={{
          visible: business?.aboutUsPage?.visible || false,
          title: business?.aboutUsPage?.title || '',
          description: business?.aboutUsPage?.description || '',
        }}
      >
        {({ value, isValid }) => {
          return (
            <form className="w-full">
              <FieldToggleButton
                label="Visible"
                name="visible"
                description={
                  <div>
                    La página de presentación se muestra en conjunto con la de publicaciones con el
                    objetivo de personalizar una descripción, comentarios o reseñas sobre su
                    negocio. Puede desactivar este campo.
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
                    Describe la  funcionalidad del negocio, permite incorporar imágenes y otros formatos de texto.
                    <br />
                    <br />
                    <span className="italic">
                      Nota: Las ampliación de las funcionalidades de este módulo estan en
                      desarrollo, para incorporar imágenes y otros formatos de texto.
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
                          aboutUsPage: value,
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
