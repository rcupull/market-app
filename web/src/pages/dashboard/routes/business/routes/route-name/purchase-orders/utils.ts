import { ShoppingState } from 'types/shopping';

export const allStatesQuery: Array<ShoppingState> = [
  // CONSTRUCTION should be ignored, the user can not see the orders in construction
  'CANCELED',
  'DELIVERED',
  'REJECTED',
  'REQUESTED',
];
