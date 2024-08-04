import React from 'react';

import { FieldClothingSizeSelectProps } from 'components/field-clothing-size-select';
import { FieldColorSelectProps } from 'components/field-colors-select';
import { Formux } from 'components/formux';
import { PostShoppingMethod } from 'components/post-shopping-method';
import { ProductDescriptionProps } from 'components/product/description/types';
import { ProductDetailsProps } from 'components/product/details/types';
import { ProductHighLightsProps } from 'components/product/hightlights/types';
import { ProductImagesProps } from 'components/product/images/types';
import { ProductPriceProps } from 'components/product/price/types';
import { ProductStockLabelProps } from 'components/product/stock/product-stock-label';
import { ReviewSummaryViewProps } from 'components/review-summary-view';

import { usePortal } from 'hooks/usePortal';

import { BusinessCurrency } from 'types/business';
import { Post } from 'types/post';

export interface ClothingProductGrid1Props {
  post?: Post | null;
  currency: BusinessCurrency;
  render: {
    images?: (props: ProductImagesProps) => React.ReactNode;
    price?: (props: ProductPriceProps) => React.ReactNode;
    review?: (props: ReviewSummaryViewProps) => React.ReactNode;
    colors?: (props: FieldColorSelectProps) => React.ReactNode;
    clothingSize?: (props: FieldClothingSizeSelectProps) => React.ReactNode;
    description?: (props: ProductDescriptionProps) => React.ReactNode;
    highLights?: (props: ProductHighLightsProps) => React.ReactNode;
    details?: (props: ProductDetailsProps) => React.ReactNode;
    stockAvailable?: (props: ProductStockLabelProps) => React.ReactNode;
    productReviews?: () => React.ReactNode;
  };
}

export const ClothingProductGrid1 = ({ post, render, currency }: ClothingProductGrid1Props) => {
  const portal = usePortal();

  if (!post) return <></>;

  const { colors, price, description, clothingSizes, details, highlights, images } = post;

  return (
    <div className="bg-white w-full">
      {/* Image gallery */}
      {render.images?.({ value: images, className: 'pt-2' })}

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {post.name}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>

          {/* Price */}
          {render.price?.({ currency, price })}

          {/* Reviews */}
          {render.review?.({ className: 'mt-10' })}

          <Formux
            value={{
              interestedByColors: [],
              interestedByClothingSizes: []
            }}
          >
            {({ value }) => {
              return (
                <form className="mt-10">
                  {/* Colors */}
                  {!!colors?.length &&
                    render.colors?.({
                      items: colors,
                      className: 'mt-10',
                      label: 'Colores disponibles',
                      name: 'interestedByColors',
                      multi: true
                    })}

                  {/* Sizes */}
                  {!!clothingSizes?.length &&
                    render.clothingSize?.({
                      sizesInStock: clothingSizes,
                      className: 'mt-10',
                      label: 'Tallas disponibles',
                      name: 'interestedByClothingSizes',
                      multi: true
                    })}

                  {portal.getPortal(
                    <PostShoppingMethod
                      post={post}
                      purshaseNotes={{
                        interestedByClothingSizes: value.interestedByClothingSizes,
                        interestedByColors: value.interestedByColors
                      }}
                      layout="shoppingCart"
                      btnPostToCartVariant="button"
                      className="mt-4 w-full"
                    />
                  )}
                </form>
              );
            }}
          </Formux>

          <div ref={portal.ref} />

          <div className="flex justify-center mt-4">{render.stockAvailable?.({ post })}</div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}

          {description && render.description?.({ value: description })}

          {highlights &&
            render.highLights?.({
              value: highlights,
              className: 'mt-10',
              title: 'Características'
            })}

          {details && render.details?.({ value: details, className: 'mt-10', title: 'Detalles' })}
          {render.productReviews?.()}
        </div>
      </div>
    </div>
  );
};
