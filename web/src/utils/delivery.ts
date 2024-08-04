import { DeliveryConfig } from 'types/business';

export const getDeliveryConfigPrice = ({
  distance,
  deliveryConfig
}: {
  distance: number;
  deliveryConfig: DeliveryConfig | undefined;
}) => {
  const { minPrice = 0, priceByKm = 0 } = deliveryConfig || {};
  return {
    price: minPrice + priceByKm * distance
  };
};
