import { BaseIdentity } from "./general";
import { Post } from "./post";

export type ShoppingState = "CONSTRUCTION" | "REQUESTED";

export interface Shopping extends BaseIdentity {
  posts: Array<{
    post: Post;
    count: number;
    lastUpdatedDate: Date;
  }>;
  //
  purchaserId: string;
  purchaserName: string;
  //
  routeName: string;
  state: ShoppingState;
}
