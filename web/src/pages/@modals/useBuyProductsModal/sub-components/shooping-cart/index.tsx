import { cloneElement, useState } from 'react';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';
import { ShoppingTermsAndConditions } from './ShoppingTermsAndConditions';

import { ShoppingCartPosts } from 'pages/@common/shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from 'pages/@common/shopping-cart-remove-all-button';
import { useShopping } from 'pages/@hooks/useShopping';

export interface ShoppingCartProps extends StepCommonProps {}

export const ShoppingCart = ({ nextButton: nextButtonProp }: ShoppingCartProps) => {
  const shopping = useShopping();
  const [approved, setApproved] = useState(false);

  if (!shopping.constructionShopping) {
    return <div className="font-semibold">No tiene productos en la bolsa</div>;
  }
  const nextButton = cloneElement(nextButtonProp, { disabled: !approved });

  return (
    <>
      <div>
        <ShoppingCartPosts value={shopping.constructionShopping} />

        <div className="flex justify-end mt-2">
          <ShoppingCartRemoveAllButton />
        </div>

        <ShoppingTermsAndConditions className="mt-4" approved={approved} onApprobed={setApproved} />
      </div>

      <ButtonNavContainer rightButton={nextButton} />
    </>
  );
};
