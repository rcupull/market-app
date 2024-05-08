import { Link } from 'react-router-dom';

import { PostShoppingMethod } from 'components/post-shopping-method';

import { CardPostImage } from './CardPostImage';
import { CardPostName } from './CardPostName';
import { CardPostPrice } from './CardPostPrice';
import { CardPostStockAmount } from './CardPostStockAmount';
import { getCardPostSizes } from './utils';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { PostCardLayout } from 'types/business';
import { Post } from 'types/post';
import { cn } from 'utils/general';

export interface CardPostProps {
  className?: string;
  post: Post;
  layout?: PostCardLayout;
  href: string;
  onRefresh: () => void;
  neverUpdate?: boolean;
}

export const CardPost = ({
  className,
  neverUpdate,
  post,
  layout,
  href,
  onRefresh,
}: CardPostProps) => {
  const businessNewUpdatePost = useBusinessNewUpdatePost();
  const { size, metaLayout } = layout || {};

  const renderMeta = () => {
    if (metaLayout === 'basic') {
      return (
        <div className="flex items-end flex-shrink-0">
          <div>
            <CardPostName layout={layout} post={post} />
            <CardPostPrice layout={layout} post={post} />
            <CardPostStockAmount post={post} />
          </div>

          <PostShoppingMethod layout={layout?.shoppingMethod} post={post} className="ml-auto" />
        </div>
      );
    }

    if (metaLayout === 'verticalCentered') {
      return (
        <div className="flex flex-col items-center flex-shrink-0">
          <CardPostName layout={layout} post={post} />
          <CardPostPrice layout={layout} post={post} />

          <PostShoppingMethod layout={layout?.shoppingMethod} post={post} />
        </div>
      );
    }

    return <></>;
  };

  const content = (
    <Link data-id="CardPost" className={cn('group', className)} to={href}>
      <div className={cn('flex flex-col p-1 w-[90vw] overflow-hidden', getCardPostSizes({ size }))}>
        <CardPostImage layout={layout} post={post} />

        {renderMeta()}
      </div>
    </Link>
  );

  if (neverUpdate) {
    return content;
  }

  return (
    <UpdateSomethingContainer
      title="Editar esta publicación"
      onClick={() =>
        businessNewUpdatePost.open({
          postId: post._id,
          onAfterSuccess: () => {
            onRefresh();
          },
        })
      }
    >
      {content}
    </UpdateSomethingContainer>
  );
};
