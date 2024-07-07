import { ShoppingState } from 'types/shopping';

export const allStatesQuery: Array<ShoppingState> = [
  ShoppingState.REQUESTED,
  ShoppingState.PROCESSING,
  ShoppingState.APPROVED,
  ShoppingState.REJECTED,
  ShoppingState.DELIVERED,
];
