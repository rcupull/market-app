import { AddressView } from 'components/address-view';
import { Button } from 'components/button';
import { FieldAddress } from 'components/field-address';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { Formux } from 'components/formux';

import { useAddOneBusiness } from 'features/api/business/useAddOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useUpdateOneUser } from 'features/api/user/useUpdateOneUser';

import { Portal } from 'hooks/usePortal';

import { User } from 'types/auth';
import { Address, Image } from 'types/general';
import { getIsValidPhone } from 'utils/validation';

interface State {
  profileImages: Array<Image>;
  name: string;
  phone?: string;
  address?: Address;
}

export interface ComponentProps {
  portal: Portal;
  user: User;
  onAfterSuccess: () => void;
}

export const Component = ({ portal, user, onAfterSuccess }: ComponentProps) => {
  const { addOneBusiness } = useAddOneBusiness();
  const { updateOneUser } = useUpdateOneUser();
  const { addManyImages } = useAddManyImages();

  return (
    <Formux<State>
      value={{
        profileImages: user?.profileImage ? [user?.profileImage] : [],
        name: user.name,
        phone: user?.phone,
        address: user?.address,
      }}
      validate={[
        {
          field: 'name',
          type: 'required',
        },
        {
          field: 'phone',
          type: 'custom',
          customCb: getIsValidPhone,
        },
      ]}
    >
      {({ value, isValid, hasChange }) => {
        return (
          <form className="w-full">
            <FieldInput name="name" label="Nombre" />

            <FieldInput name="phone" label="Teléfono" className="mt-6" typeOnlyNumbers />

            <FieldAddress
              label="Dirección"
              name="address"
              className="mt-6"
              collapsable
              collapsableHeader={<AddressView address={value.address || {}} />}
            />

            <FieldInputImages
              id="profileImages"
              name="profileImages"
              label="Imagen del perfil"
              className="mt-6"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={
                  addOneBusiness.status.isBusy ||
                  updateOneUser.status.isBusy ||
                  addManyImages.status.isBusy
                }
                disabled={!isValid || !hasChange}
                onClick={() => {
                  const { profileImages, name, address, phone } = value;

                  const handleSubmit = (profileImage?: Image | null) => {
                    updateOneUser.fetch(
                      {
                        userId: user._id,
                        update: {
                          profileImage,
                          name,
                          address,
                          phone,
                        },
                      },
                      {
                        onAfterSuccess: () => onAfterSuccess(),
                      }
                    );
                  };

                  if (profileImages.length) {
                    addManyImages.fetch(
                      { images: profileImages, userId: user._id },
                      {
                        onAfterSuccess: (images) => {
                          handleSubmit(images[0]);
                        },
                      }
                    );
                  } else {
                    handleSubmit(null);
                  }
                }}
                variant="primary"
                className="w-full"
              />
            )}
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
