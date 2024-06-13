import { BaseIdentity } from './general';
import { Post } from './post';

export type ShoppingState =
  | 'CONSTRUCTION'
  | 'REQUESTED'
  | 'PROCESSING'
  | 'READY_TO_DELIVER'
  | 'DELIVERED'
  //
  | 'CANCELED'
  | 'REJECTED'
  //
  | 'INVOICED'
  | 'PAID';

export interface Shopping extends BaseIdentity {
  posts: Array<{
    post: Post;
    count: number;
    lastUpdatedDate: Date;
  }>;
  purchaserId: string;
  purchaserName: string;
  routeName: string;
  state: ShoppingState;
  history?: Array<{
    state: ShoppingState;
    lastUpdatedDate: string;
  }>;
}
