import { getCardPostMetaSizes } from './utils';

import { PostCardLayout } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { cn } from 'utils/general';

export interface CardPostNameProps extends StyleProps {
  post: Post;
  layout?: PostCardLayout;
}

export const CardPostName = ({ post, layout, className }: CardPostNameProps) => {
  const nameLayout = layout?.name;

  const name = post.name;

  if (nameLayout === 'none') {
    return <></>;
  }

  return (
    <h3
      className={cn('mt-4 text-gray-700', getCardPostMetaSizes({ size: layout?.size }), className)}
    >
      {name}
    </h3>
  );
};
