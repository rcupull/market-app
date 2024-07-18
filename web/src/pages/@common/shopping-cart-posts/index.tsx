import { PostAdded } from './post-added';

import { StyleProps } from 'types/general';
import { Shopping } from 'types/shopping';
import { cn } from 'utils/general';

export interface ShoppingCartPostsProps extends StyleProps {
  value: Shopping;
}

export const ShoppingCartPosts = ({ value, className }: ShoppingCartPostsProps) => {
  const { routeName } = value;
  return (
    <div className={cn('flex flex-col gap-1 mt-3 overflow-y-auto', className)}>
      {value.posts.map((shoppingPostMeta, index) => {
        return <PostAdded key={index} shoppingPostMeta={shoppingPostMeta} routeName={routeName} />;
      })}
    </div>
  );
};
