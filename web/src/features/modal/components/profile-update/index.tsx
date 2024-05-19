import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { Formux } from 'components/formux';
import { Modal } from 'components/modal';

import { useAddOneBusiness } from 'features/api/business/useAddOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useGetOneUser } from 'features/api/useGetOneUser';
import { useUpdateOneUser } from 'features/api/useUpdateOneUser';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { usePortal } from 'hooks/usePortal';

import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface ProfileUpdateProps {
  userId: string;
  callAfarResources?: CallAfarResources;
}

export const ProfileUpdate = ({ userId, callAfarResources }: ProfileUpdateProps) => {
  const { onClose } = useModal();

  const { getOneUser } = useGetOneUser();

  const { onCallAfar } = useCallFromAfar();

  useEffect(() => {
    getOneUser.fetch({ userId });
  }, []);

  const { addOneBusiness } = useAddOneBusiness();
  const { updateOneUser } = useUpdateOneUser();
  const { addManyImages } = useAddManyImages();

  const user = getOneUser.data;

  const portal = usePortal();

  const content = (
    <Formux
      value={{
        profileImages: user?.profileImage ? [user?.profileImage] : [],
        name: user?.name,
      }}
    >
      {({ value, isValid }) => {
        return (
          <form>
            <FieldInput name="name" label="Nombre" />

            <FieldInputImages
              id="profileImages"
              name="profileImages"
              label="Imagen del perfil"
              getImageSrc={getImageEndpoint}
              className="mt-6"
            />
            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOneBusiness.status.isBusy || updateOneUser.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { profileImages, name } = value;

                  const handleSubmit = (profileImage?: Image | null) => {
                    updateOneUser.fetch(
                      {
                        userId,
                        update: {
                          profileImage,
                          name,
                        },
                      },
                      {
                        onAfterSuccess: () => {
                          onClose();

                          callAfarResources && onCallAfar(callAfarResources);
                        },
                      },
                    );
                  };

                  if (profileImages.length) {
                    addManyImages.fetch(
                      { images: profileImages, userId },
                      {
                        onAfterSuccess: (images) => {
                          handleSubmit(images[0]);
                        },
                      },
                    );
                  } else {
                    handleSubmit(null);
                  }
                }}
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formux>
  );

  return (
    <Modal
      title="Editar perfil"
      content={content}
      badge={<Badge variant="info" />}
      isBusy={getOneUser.status.isBusy}
      primaryBtn={<div ref={portal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
