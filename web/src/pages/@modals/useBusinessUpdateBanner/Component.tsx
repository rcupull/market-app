import { useState } from 'react';

import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInputImages } from 'components/field-input-images';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { BannerLayoutType } from 'types/business';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  bannerImages: Array<ImageFile | Image>;
  bannerLayoutType: BannerLayoutType;
}

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { bannerImages, routeName } = business || {};

  const initialState: State = {
    bannerImages: bannerImages || [],
    bannerLayoutType: business?.layouts?.banner?.type || 'none',
  };

  const [state, setState] = useState<State>(initialState);

  const { updateOneBusiness } = useUpdateOneBusiness();
  const { addManyImages } = useAddManyImages();

  return (
    <Formux<State>
      onChange={setState}
      value={state}
      validate={
        state.bannerLayoutType !== 'none'
          ? [
              {
                field: 'bannerImages',
                type: 'custom',
                customCb: (value) => value.length,
              },
            ]
          : undefined
      }
    >
      {({ value, isValid, hasChange }) => {
        return (
          <form>
            <FieldRadioGroup<{
              value: BannerLayoutType;
              label: string;
            }>
              label="Diseño"
              renderOption={({ checked, item }) => {
                return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
              }}
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'none',
                  label: 'Ninguno',
                },
                {
                  value: 'static',
                  label: 'Estático',
                },
                {
                  value: 'swipableClassic',
                  label: 'Deslizante',
                },
              ]}
              name="bannerLayoutType"
              containerClassName="flex flex-col sm:flex-row sm:items-center sm:gap-4"
            />

            <FieldInputImages
              label="Imágenes"
              name="bannerImages"
              className="mt-6"
              getImageSrc={getImageEndpoint}
              multi
              enabledImageHref
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy || addManyImages.status.isBusy}
                disabled={!isValid}
                hasChange={hasChange}
                onClick={() => {
                  if (!business) return;

                  const { bannerImages, bannerLayoutType } = value;

                  if (bannerImages.length) {
                    addManyImages.fetch(
                      { images: bannerImages, routeName, userId: business.createdBy },
                      {
                        onAfterSuccess: (bannerImages) => {
                          updateOneBusiness.fetch(
                            {
                              update: {
                                bannerImages,
                                layouts: {
                                  ...business.layouts,
                                  banner: {
                                    type: bannerLayoutType,
                                  },
                                },
                              },
                              routeName: business.routeName,
                            },
                            {
                              onAfterSuccess,
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
    </Formux>
  );
};

export default Component;
