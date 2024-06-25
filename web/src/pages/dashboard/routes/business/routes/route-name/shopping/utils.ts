import { ShoppingState } from 'types/shopping';

export const allStatesQuery: Array<ShoppingState> = [
  'REQUESTED',
  'PROCESSING',
  'APPROVED',
  'REJECTED',
  'DELIVERED',
  // 'READY_TO_DELIVER',
  /**
   * ignored in this view
   */
  // 'CONSTRUCTION',
  // 'CANCELED',
];
