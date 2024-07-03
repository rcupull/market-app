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
      {value.posts.map(({ count, postData }, index) => {
        return (
          <PostAdded
            key={index}
            count={count}
            postId={postData._id}
            routeName={routeName}
            postName={postData.name}
            postImages={postData.images}
          />
        );
      })}
    </div>
  );
};
