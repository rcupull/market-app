import { PostAdded } from './post-added';

import { Shopping } from 'types/shopping';

export interface ShoppingCartPostsProps {
  value: Shopping;
}

export const ShoppingCartPosts = ({ value }: ShoppingCartPostsProps) => {
  const { routeName } = value;
  return (
    <div className="flex flex-col gap-1 mt-3">
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
