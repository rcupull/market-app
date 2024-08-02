import { AddressView } from 'components/address-view';
import { Button } from 'components/button';
import { FieldAddress } from 'components/field-address';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { Formux } from 'components/formux';

import { useAddOneBusiness } from 'features/api/business/useAddOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useUpdateOneUser } from 'features/api/user/useUpdateOneUser';
import { useCloseContext } from 'features/modal/closeContext/useCloseContext';

import { Portal } from 'hooks/usePortal';

import { useTermsAndConditionsModal } from '../useTermsAndConditionsModal';

import { User } from 'types/auth';
import { Address, Image } from 'types/general';
import { getIsValidPhone } from 'utils/validation';

interface State extends Pick<User, 'name' | 'phone' | 'canCreateBusiness' | 'canMakeDeliveries'> {
  profileImages: Array<Image>;
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
  const { termsAndConditionsModal } = useTermsAndConditionsModal();

  const initialValue = {
    profileImages: user?.profileImage ? [user?.profileImage] : [],
    name: user.name,
    phone: user?.phone,
    address: user?.addresses?.[0],
    canCreateBusiness: user?.canCreateBusiness,
    canMakeDeliveries: user?.canMakeDeliveries,
  };

  const { onChangeUnsavedChanges } = useCloseContext();

  return (
    <Formux<State>
      value={initialValue}
      validate={[
        {
          field: 'name',
          type: 'required',
        },
        {
          field: 'phone',
          type: 'custom',
          customCb: (value) => (value ? getIsValidPhone(value) : true),
        },
      ]}
    >
      {({ value, hasChange }) => {
        onChangeUnsavedChanges(hasChange);

        return (
          <form className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <FieldCheckbox
                label="Comerciante"
                name="canCreateBusiness"
                disabled={user.canCreateBusiness}
                description={
                  <div className="text-center sm:text-start">
                    Al activar la opción de <span className="font-bold">Comerciante</span> usted
                    podrá <span className="font-bold">crear y administrar sus negocios</span> en la
                    plataforma segun las regulaciones vigentes en nuestros{' '}
                    <Button
                      variant="link"
                      className="!inline-block"
                      onClick={() => termsAndConditionsModal.open()}
                      label="Términos y condiciones"
                    />
                  </div>
                }
              />

              <FieldCheckbox
                label="Mensajero"
                name="canMakeDeliveries"
                disabled={user.canMakeDeliveries}
                description={
                  <div className="text-center sm:text-start">
                    Al activar la opción de <span className="font-bold">Mensajero</span> usted podrá
                    ser elegido por los comerciantes para realizar las entregas de los productos.
                    Algunos datos extras le serán requeridos para poder efectuar esta labor.
                  </div>
                }
              />
            </div>

            <FieldInput name="name" label="Nombre" className="mt-6" />

            <FieldInput name="phone" label="Teléfono" className="mt-6" typeOnlyNumbers />

            <FieldAddress
              label="Dirección"
              name="address"
              className="mt-6"
              collapsable
              collapsableHeader={<AddressView address={value.address} />}
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
                formuxSubmit
                isBusy={
                  addOneBusiness.status.isBusy ||
                  updateOneUser.status.isBusy ||
                  addManyImages.status.isBusy
                }
                onClick={() => {
                  const {
                    profileImages,
                    name,
                    address,
                    phone,
                    canCreateBusiness,
                    canMakeDeliveries,
                  } = value;

                  const handleSubmit = (profileImage?: Image | null) => {
                    updateOneUser.fetch(
                      {
                        userId: user._id,
                        update: {
                          profileImage,
                          name,
                          addresses: address ? [address] : undefined,
                          phone,
                          canCreateBusiness,
                          canMakeDeliveries,
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
