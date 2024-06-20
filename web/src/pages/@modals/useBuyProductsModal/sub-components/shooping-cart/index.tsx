import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';
import { ShoppingTermsAndConditions } from './ShoppingTermsAndConditions';

import { ShoppingCartPosts } from 'pages/@common/shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from 'pages/@common/shopping-cart-remove-all-button';
import { useShopping } from 'pages/@hooks/useShopping';

export interface ShoppingCartProps extends StepCommonProps {}

export const ShoppingCart = ({ nextButton }: ShoppingCartProps) => {
  const shopping = useShopping();

  if (!shopping.lastShopping) {
    return <div className="font-semibold">No tiene productos en la bolsa</div>;
  }

  return (
    <>
      <div>
        <ShoppingTermsAndConditions />
        <ShoppingCartPosts value={shopping.lastShopping} />

        <div className="flex justify-end mt-2">
          <ShoppingCartRemoveAllButton />
        </div>
      </div>

      <ButtonNavContainer rightButton={nextButton} />
    </>
  );
};
