import { useRef } from 'react';

import { Button } from 'components/button';
import { CheckEditorUtils } from 'components/check-editor';
import { CheckEditorUploadAdapter } from 'components/check-editor/CheckEditorUploadAdapter';
import { getCheckEditorUploadUrl } from 'components/check-editor/utils';
import { FieldCheckEditor } from 'components/field-check-editor';
import { FieldInput } from 'components/field-input';
import { FieldToggleButton } from 'components/field-toggle-button';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
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
  const refCheckEditorUtils = useRef<CheckEditorUtils>();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const initialValue: State = {
    visible: business?.aboutUsPage?.visible || false,
    title: business?.aboutUsPage?.title || '',
    description: business?.aboutUsPage?.description || '',
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
                classNameContainer="max-h-[50vh]"
                description={<div>Describe la funcionalidad del negocio.</div>}
                getUploadAdapter={(args) => {
                  return new CheckEditorUploadAdapter({
                    ...args,
                    uploadUrl: getCheckEditorUploadUrl({ routeName }),
                  });
                }}
                onChangeUtils={(utils) => {
                  refCheckEditorUtils.current = utils;
                }}
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    const handleRemoveImagesFromCheckEditor = () => {
                      const imagesSrcToRemove = refCheckEditorUtils.current
                        ?.getImageSrcToRemvove(initialValue.description)
                        .map((o) => o.replace(getEndpointUrl(), ''));

                      if (imagesSrcToRemove?.length) {
                        /**
                         * TODO use imagesSrcToRemove to remove the deleted images in checkEditor
                         */
                      }
                    };

                    updateOneBusiness.fetch(
                      {
                        update: {
                          aboutUsPage: value,
                        },
                        routeName,
                      },
                      {
                        onAfterSuccess: () => {
                          handleRemoveImagesFromCheckEditor();

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
