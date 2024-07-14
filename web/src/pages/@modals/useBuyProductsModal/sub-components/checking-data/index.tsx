import { cloneElement, useState } from 'react';

import { Divider } from 'components/divider';

import { useShoppingMakeOrder } from 'features/api/shopping/useShoppingMakeOrder';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';
import { DeliveryData } from './DeliveryData';
import { PersonalData } from './PersonalData';

import { ShoppingDetails } from 'pages/@common/shopping-details';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';

export interface CheckingDataProps extends StepCommonProps {}

export const CheckingData = ({ nextButton: nextButtonProp, backButton }: CheckingDataProps) => {
  const { shoppingMakeOrder } = useShoppingMakeOrder();
  const cart = useCart();
  const { business } = useBusiness();
  const [isValidPersonalData, setIsValidPersonalData] = useState(false);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);

  if (!cart.constructionShopping) {
    return <></>;
  }

  const nextButton = cloneElement(nextButtonProp, {
    label: 'Crear orden',
    isBusy: shoppingMakeOrder.status.isBusy,
    disabled: !isValidPersonalData,
    onClick: () => {
      if (!cart.constructionShopping || !business) return;

      const { _id: shoppingId } = cart.constructionShopping;

      shoppingMakeOrder.fetch(
        { shoppingId, deliveryEnabled },
        {
          onAfterSuccess: () => {
            cart.onFetch();
            nextButtonProp.props.onClick();
          },
        },
      );
    },
  });

  return (
    <>
      <ShoppingDetails shopping={cart.constructionShopping} />

      <Divider className="!my-2" />

      <DeliveryData className="mt-6" onChange={setDeliveryEnabled} value={deliveryEnabled} />

      <Divider className="!my-2" />

      <PersonalData className="mt-6" onValid={setIsValidPersonalData} />

      <ButtonNavContainer leftButton={backButton} rightButton={nextButton} />
    </>
  );
};
