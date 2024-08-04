import { ButtonPostToCart, ButtonPostToCartProps } from './ButtonPostToCart';

import { PostLayoutShoppingMethod } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';

export interface PostShoppingMethodProps extends StyleProps {
  post: Post;
  purshaseNotes?: ButtonPostToCartProps['purshaseNotes'];
  layout?: PostLayoutShoppingMethod;
  btnPostToCartVariant?: ButtonPostToCartProps['variant'];
}

export const PostShoppingMethod = ({
  layout,
  post,
  purshaseNotes,
  className,
  btnPostToCartVariant
}: PostShoppingMethodProps) => {
  if (layout === 'shoppingCart') {
    return (
      <ButtonPostToCart
        post={post}
        purshaseNotes={purshaseNotes}
        className={className}
        variant={btnPostToCartVariant}
      />
    );
  }

  return <></>;
};
