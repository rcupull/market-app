import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldInputImages } from 'components/field-input-images';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  bannerImages: Array<ImageFile | Image>;
}

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();

  const { onClose } = useModal();
  const { userPlan } = useGetUserPaymentPlan();

  const { bannerImages, routeName } = business || {};

  const { updateOneBusiness } = useUpdateOneBusiness();
  const { addManyImages } = useAddManyImages();

  const initialValues = useMemo<State>(
    () => ({
      bannerImages: bannerImages || [],
    }),
    [bannerImages],
  );

  if (!routeName) {
    return <></>;
  }

  return (
    <Formik<{
      bannerImages: Array<ImageFile | Image>;
    }>
      initialValues={initialValues}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({ values, isValid }) => {
        return (
          <form>
            <FieldInputImages
              id="bannerImages"
              name="bannerImages"
              className="mt-6"
              getImageSrc={getImageEndpoint}
              multi
              max={userPlan?.maxImagesByBusinessBanner}
              enabledImageHref
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy || addManyImages.status.isBusy}
                disabled={!isValid || initialValues.bannerImages === values.bannerImages}
                onClick={() => {
                  if (!business) return;

                  const { bannerImages } = values;

                  if (bannerImages.length) {
                    addManyImages.fetch(
                      { images: bannerImages, routeName, userId: business.createdBy },
                      {
                        onAfterSuccess: (bannerImages) => {
                          updateOneBusiness.fetch(
                            {
                              update: {
                                bannerImages,
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
                        },
                      },
                    );
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
