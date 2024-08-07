import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages1 } from 'components/product/images/product-images-1';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { ReviewSummaryView } from 'components/review-summary-view';

import { ClothingProductGrid1 } from '.';

import { dummyPostClothing } from 'constants/dummies';
import { FormikWrapper } from 'utils/storybook';

export default {
  component: ClothingProductGrid1
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <ClothingProductGrid1
      post={dummyPostClothing}
      currency="CUP"
      render={{
        images: (props) => <ProductImages1 {...props} />,
        price: (props) => <ProductPrice1 {...props} />,
        review: (props) => <ReviewSummaryView {...props} />,
        colors: (props) => <FieldColorSelect {...props} />,
        clothingSize: (props) => <FieldClothingSizeSelect {...props} />,
        description: (props) => <ProductDescription1 {...props} />,
        highLights: (props) => <ProductHighLights1 {...props} />,
        details: (props) => <ProductDetails1 {...props} />
      }}
    />
  </FormikWrapper>
);
