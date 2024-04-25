import { Button } from 'components/button';
import { FieldClothingSizeSelectProps } from 'components/field-clothing-size-select';
import { FieldColorSelectProps } from 'components/field-colors-select';
import { ProductDescriptionProps } from 'components/product/description/types';
import { ProductDetailsProps } from 'components/product/details/types';
import { ProductHighLightsProps } from 'components/product/hightlights/types';
import { ProductImagesProps } from 'components/product/images/types';
import { ProductPriceProps } from 'components/product/price/types';
import { ReviewProps } from 'components/review';

import { usePortal } from 'hooks/usePortal';

import { Formik } from 'formik';
import { Post, PostColor } from 'types/post';

export interface ClothingProductGrid1Props {
  value?: Post | null;
  onAddToCar?: (args: { color?: PostColor; size?: string }) => void;
  getImageUrl?: (src: string) => string;
  render: {
    images?: (props: ProductImagesProps) => React.ReactNode;
    price?: (props: ProductPriceProps) => React.ReactNode;
    review?: (props: ReviewProps) => React.ReactNode;
    colors?: (props: FieldColorSelectProps<PostColor>) => React.ReactNode;
    clothingSize?: (props: FieldClothingSizeSelectProps) => React.ReactNode;
    description?: (props: ProductDescriptionProps) => React.ReactNode;
    highLights?: (props: ProductHighLightsProps) => React.ReactNode;
    details?: (props: ProductDetailsProps) => React.ReactNode;
  };
}

export const ClothingProductGrid1 = ({
  value,
  render,
  onAddToCar,
  getImageUrl,
}: ClothingProductGrid1Props) => {
  const portal = usePortal();

  if (!value) return <></>;

  const {
    colors,
    currency,
    price,
    description,
    clothingSizes,
    details,
    highlights,
    reviews,
    images,
  } = value;

  return (
    <div className="bg-white w-full">
      {/* Image gallery */}
      {render.images?.({ value: images, getImageUrl, className: 'pt-2' })}

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {value.name}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>

          {/* Price */}
          {render.price?.({ currency, price })}

          {/* Reviews */}
          {reviews && render.review?.({ value: reviews, className: 'mt-10' })}

          <Formik
            initialValues={{
              color: colors?.[0],
              size: clothingSizes?.find((size) => size),
            }}
            validate={() => ({})}
            onSubmit={() => {}}
          >
            {({ values }) => {
              return (
                <form className="mt-10">
                  {/* Colors */}
                  {!!colors?.length &&
                    render.colors?.({
                      items: colors,
                      className: 'mt-10',
                      label: 'Colores',
                      name: 'color',
                    })}

                  {/* Sizes */}
                  {!!clothingSizes?.length &&
                    render.clothingSize?.({
                      sizesInStock: clothingSizes,
                      className: 'mt-10',
                      label: 'Tallas',
                      name: 'clothingSizes',
                    })}

                  {portal.getPortal(
                    <Button
                      label="Add to bag"
                      className="mt-10 w-full"
                      onClick={() => {
                        const { color, size } = values;

                        onAddToCar?.({ color, size });
                      }}
                    />,
                  )}
                </form>
              );
            }}
          </Formik>

          <div ref={portal.ref} />
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}

          {description && render.description?.({ value: description })}

          {highlights &&
            render.highLights?.({
              value: highlights,
              className: 'mt-10',
              title: 'Características',
            })}

          {details && render.details?.({ value: details, className: 'mt-10', title: 'Detalles' })}
        </div>
      </div>
    </div>
  );
};
