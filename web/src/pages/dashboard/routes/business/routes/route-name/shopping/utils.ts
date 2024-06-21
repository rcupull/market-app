import { ShoppingState } from 'types/shopping';

export const allStatesQuery: Array<ShoppingState> = [
  'REQUESTED',
  'PROCESSING',
  'APPROVED',
  'CANCELED',
  'REJECTED',
  'DELIVERED',
  'READY_TO_DELIVER',
  /**
   * ignored in this view
   */
  // 'CONSTRUCTION',
];
