import { ShoppingState } from 'types/shopping';

export const getAllStatesQuery = ({
  businessHasDelivery,
}: {
  businessHasDelivery: boolean;
}): Array<ShoppingState> => {
  if (businessHasDelivery) {
    return [
      ShoppingState.REQUESTED,
      ShoppingState.PROCESSING,
      ShoppingState.APPROVED,
      ShoppingState.REJECTED,
      ShoppingState.DELIVERED,
      ShoppingState.READY_TO_DELIVERY,
    ];
  }

  return [
    ShoppingState.REQUESTED,
    ShoppingState.PROCESSING,
    ShoppingState.APPROVED,
    ShoppingState.REJECTED,
    ShoppingState.DELIVERED,
  ];
};
