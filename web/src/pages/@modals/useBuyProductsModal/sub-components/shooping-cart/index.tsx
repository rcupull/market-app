import { Button } from 'components/button';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';
import { ShoppingTermsAndConditions } from './ShoppingTermsAndConditions';

import { ShoppingCartPosts } from 'pages/@common/shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from 'pages/@common/shopping-cart-remove-all-button';
import { useCart } from 'pages/@hooks/useCart';

export interface ShoppingCartProps extends StepCommonProps {
  onApproved: boolean;
  setOnApproved: (approved: boolean) => void;
}

export const ShoppingCart = ({ nextBtnProps, onApproved, setOnApproved }: ShoppingCartProps) => {
  const cart = useCart();

  if (!cart.constructionShopping) {
    return <div className="font-semibold">No tiene productos en la bolsa</div>;
  }

  return (
    <>
      <div>
        <ShoppingCartPosts value={cart.constructionShopping} />

        <div className="flex justify-end mt-2">
          <ShoppingCartRemoveAllButton />
        </div>

        <ShoppingTermsAndConditions className="mt-4" approved={onApproved} onApprobed={setOnApproved} />
      </div>

      <ButtonNavContainer rightButton={<Button {...nextBtnProps} disabled={!onApproved} />} />
    </>
  );
};
