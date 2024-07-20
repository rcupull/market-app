import { Button } from 'components/button';
import { FieldInputImages } from 'components/field-input-images';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { imagesDimensions } from 'constants/posts';
import { Image, ImageFile } from 'types/general';

interface State {
  logoField: Array<ImageFile | Image | undefined | null>;
}

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();

  const { onClose } = useModal();

  const { logo, routeName } = business || {};

  const { updateOneBusiness } = useUpdateOneBusiness();
  const { addManyImages } = useAddManyImages();

  if (!routeName) {
    return <></>;
  }

  return (
    <Formux<State>
      value={{
        logoField: [logo],
      }}
    >
      {({ value }) => {
        return (
          <form>
            <FieldInputImages id="logoField" name="logoField" className="mt-6" />

            {portal.getPortal(
              <Button
                label="Guardar"
                formuxSubmit
                isBusy={updateOneBusiness.status.isBusy || addManyImages.status.isBusy}
                onClick={() => {
                  if (!business) return;
                  const { logoField } = value;

                  const [logo] = logoField;

                  const submitLogo = (logo: Image | null) => {
                    updateOneBusiness.fetch(
                      {
                        update: {
                          logo,
                        },
                        routeName,
                      },
                      {
                        onAfterSuccess: () => {
                          onFetch({ routeName });
                          onClose();
                        },
                      }
                    );
                  };

                  if (logo) {
                    addManyImages.fetch(
                      {
                        images: [logo],
                        routeName,
                        userId: business.createdBy,
                        ...imagesDimensions.logo,
                      },
                      {
                        onAfterSuccess: ([logo]) => submitLogo(logo),
                      }
                    );
                  } else {
                    submitLogo(null);
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
