import { PostCardLayout } from 'types/business';
import { Post } from 'types/post';

export interface CardPostNameProps {
  post: Post;
  layout?: PostCardLayout;
}

export const CardPostName = ({ post, layout }: CardPostNameProps) => {
  const nameLayout = layout?.name;
  const name = post.name;

  if (nameLayout === 'none') {
    return <></>;
  }

  return <h3 className="mt-4 text-lg text-gray-700">{name}</h3>;
};
