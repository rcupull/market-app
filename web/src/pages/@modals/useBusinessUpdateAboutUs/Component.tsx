import { Button } from 'components/button';
import { CheckEditorUploadAdapter } from 'components/check-editor/CheckEditorUploadAdapter';
import { getCheckEditorUploadUrl, getImagesToRemove } from 'components/check-editor/utils';
import { FieldCheckEditor } from 'components/field-check-editor';
import { FieldInput } from 'components/field-input';
import { FieldToggleButton } from 'components/field-toggle-button';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useDeleteImages } from 'features/api/images/useDeleteImages';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { BusinessAboutUsPage } from 'types/business';
import { getEndpointUrl } from 'utils/api';

interface State extends BusinessAboutUsPage {}

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const { deleteImages } = useDeleteImages();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const initialValue: State = {
    visible: business?.aboutUsPage?.visible || false,
    title: business?.aboutUsPage?.title || '',
    description: business?.aboutUsPage?.description || '',
  };

  const handleRemoveImageSrc = (urls: Array<string>) => {
    if (!urls.length) return;

    const srcs = urls.map((url) => url.replace(getEndpointUrl(), ''));
    deleteImages.fetch({ srcs });
  };

  return (
    <>
      <Formux<State> value={initialValue}>
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
                checkEditorProps={{
                  className:'check-editor-max-h-50vh',
                  getUploadAdapter:(args) => {
                    return new CheckEditorUploadAdapter({
                      ...args,
                      uploadUrl: getCheckEditorUploadUrl({ routeName }),
                    });
                  }
                }}
                description={<div>Describe la funcionalidad del negocio.</div>}
                onChange={(newValue) => {
                  /**
                   * remove all images added and remove excluding the initial images
                   */
                  const imagesToRemove = getImagesToRemove({
                    newData: newValue,
                    currentData: value.description,
                    exclude: business?.aboutUsPage?.description,
                  });
                  handleRemoveImageSrc(imagesToRemove);
                }}
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    /**
                     * remove all images added and remove according initial images
                     */
                    const imagesToRemove = getImagesToRemove({
                      newData: value.description || '',
                      currentData: business?.aboutUsPage?.description,
                    });

                    handleRemoveImageSrc(imagesToRemove);

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
