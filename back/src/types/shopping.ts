import { BaseIdentity } from './general';
import { Post, PostPurshaseNotes } from './post';

export type ShoppingState = 'CONSTRUCTION' | 'REQUESTED' | 'DELIVERED' | 'CANCELED' | 'REJECTED';

export interface Shopping extends BaseIdentity {
  posts: Array<{
    post: Post;
    purshaseNotes?: PostPurshaseNotes;
    count: number;
    lastUpdatedDate: Date;
  }>;
  //
  purchaserId: string;
  purchaserName: string;
  //
  routeName: string;
  state: ShoppingState;
  history?: Array<{
    state: ShoppingState;
    lastUpdatedDate: Date;
  }>;
}
