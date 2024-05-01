import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldInputImages } from 'components/field-input-images';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { imagesDimensions } from 'constants/posts';
import { Formik } from 'formik';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

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

  const initialValues = useMemo<State>(
    () => ({
      logoField: [logo],
    }),
    [logo],
  );

  if (!routeName) {
    return <></>;
  }

  return (
    <Formik<State> initialValues={initialValues} onSubmit={() => {}} enableReinitialize>
      {({ values, isValid }) => {
        return (
          <form>
            <FieldInputImages
              id="logoField"
              name="logoField"
              className="mt-6"
              getImageSrc={getImageEndpoint}
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy || addManyImages.status.isBusy}
                disabled={!isValid || initialValues.logoField === values.logoField}
                onClick={() => {
                  if (!business) return;
                  const { logoField } = values;

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
                      },
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
                      },
                    );
                  } else {
                    submitLogo(null);
                  }
                }}
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );
};
