import { cloneElement } from 'react';

import { useShoppingMakeOrder } from 'features/api/shopping/useShoppingMakeOrder';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import { ShoppingDetails } from 'pages/@common/shopping-details';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShopping } from 'pages/@hooks/useShopping';

export interface CheckingDataProps extends StepCommonProps {}

export const CheckingData = ({ nextButton: nextButtonProp, backButton }: CheckingDataProps) => {
  const { shoppingMakeOrder } = useShoppingMakeOrder();
  const shopping = useShopping();
  const { business } = useBusiness();

  if (!shopping.constructionShopping) {
    return <></>;
  }

  const nextButton = cloneElement(nextButtonProp, {
    label: 'Crear orden',
    isBusy: shoppingMakeOrder.status.isBusy,
    onClick: () => {
      if (!shopping.constructionShopping || !business) return;

      const { _id: shoppingId } = shopping.constructionShopping;

      shoppingMakeOrder.fetch(
        { shoppingId },
        {
          onAfterSuccess: () => {
            shopping.onFetch({ routeName: business.routeName }), nextButtonProp.props.onClick();
          },
        },
      );
    },
  });

  return (
    <>
      <div className="flex justify-center">
        <ShoppingDetails shopping={shopping.constructionShopping} />
      </div>

      <ButtonNavContainer leftButton={backButton} rightButton={nextButton} />
    </>
  );
};
