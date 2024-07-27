import { useState } from 'react';

import { Button } from 'components/button';
import { Divider } from 'components/divider';

import { useShoppingMakeOrder } from 'features/api/shopping/useShoppingMakeOrder';
import { useAuth } from 'features/api-slices/useAuth';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';
import { DeliveryData } from './DeliveryData';
import { PersonalData } from './PersonalData';

import { ShoppingDetails } from 'pages/@common/shopping-details';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';
import { ShoppingDelivery } from 'types/shopping';
import { getDeliveryUtils } from 'utils/business';
import { isNullOrUndefined } from 'utils/general';

export interface CheckingDataProps extends StepCommonProps {}

export const CheckingData = ({ nextBtnProps, backBtnProps }: CheckingDataProps) => {
  const { shoppingMakeOrder } = useShoppingMakeOrder();
  const cart = useCart();
  const { business } = useBusiness();
  const [isValidPersonalData, setIsValidPersonalData] = useState(false);
  const [takeDelivery, setTakeDelivery] = useState(false);
  const { user } = useAuth();

  if (!cart.constructionShopping) {
    return <></>;
  }

  return (
    <>
      <ShoppingDetails shopping={cart.constructionShopping} />

      <Divider narrow />

      <DeliveryData
        className="my-4"
        onChangeTakeDelivery={setTakeDelivery}
        takeDelivery={takeDelivery}
      />

      <Divider narrow />

      <PersonalData className="mt-6" onValid={setIsValidPersonalData} />

      <ButtonNavContainer
        leftButton={<Button {...backBtnProps} />}
        rightButton={
          <Button
            {...nextBtnProps}
            label="Crear orden"
            isBusy={shoppingMakeOrder.status.isBusy}
            disabled={!isValidPersonalData}
            onClick={() => {
              if (!cart.constructionShopping || !business) return;

              const { _id: shoppingId } = cart.constructionShopping;

              const getDelivery = (): ShoppingDelivery | undefined => {
                const businessAddress = business.addresses?.[0];
                const userAddress = user?.addresses?.[0];
                const deliveryType = business?.deliveryConfig?.type;

                const { getDistance, getPrice } = getDeliveryUtils();

                const distance = getDistance({ businessAddress, userAddress });

                const price = getPrice({ distance, deliveryConfig: business.deliveryConfig });

                if (!takeDelivery) return undefined;
                if (isNullOrUndefined(distance)) return undefined;
                if (isNullOrUndefined(price)) return undefined;
                if (isNullOrUndefined(deliveryType)) return undefined;

                return {
                  deliveryType,
                  price,
                  distance,
                };
              };

              shoppingMakeOrder.fetch(
                { shoppingId, delivery: getDelivery() },
                {
                  onAfterSuccess: () => {
                    cart.onFetch();
                    nextBtnProps.onClick?.();
                  },
                },
              );
            }}
          />
        }
      />
    </>
  );
};
