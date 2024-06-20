import { Link } from 'react-router-dom';

import { PostShoppingMethod } from 'components/post-shopping-method';

import { CardPostImage } from './CardPostImage';
import { CardPostName } from './CardPostName';
import { CardPostPrice } from './CardPostPrice';
import { CardPostStockAmount } from './CardPostStockAmount';
import { getCardPostSizes } from './utils';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { BusinessCurrency, PostCardLayout } from 'types/business';
import { Post } from 'types/post';
import { cn } from 'utils/general';

export interface CardPostProps {
  className?: string;
  post: Post;
  layout?: PostCardLayout;
  href: string;
  onRefresh: () => void;
  neverUpdate?: boolean;
  currency: BusinessCurrency;
}

export const CardPost = ({
  className,
  neverUpdate,
  post,
  layout,
  href,
  onRefresh,
  currency,
}: CardPostProps) => {
  const businessNewUpdatePost = useBusinessNewUpdatePost();
  const { size, metaLayout } = layout || {};

  const renderMeta = () => {
    if (metaLayout === 'basic') {
      return (
        <div className="flex items-end flex-shrink-0">
          <div>
            <CardPostName layout={layout} post={post} />
            <CardPostPrice layout={layout} post={post} currency={currency} />
            <CardPostStockAmount post={post} />
          </div>

          <PostShoppingMethod layout={layout?.shoppingMethod} post={post} className="ml-auto" />
        </div>
      );
    }

    if (metaLayout === 'verticalCentered') {
      return (
        <div className="flex flex-col items-center flex-shrink-0">
          <CardPostName layout={layout} post={post} className="text-center" />
          <CardPostPrice layout={layout} post={post} currency={currency} />

          <PostShoppingMethod layout={layout?.shoppingMethod} post={post} />
        </div>
      );
    }

    return <></>;
  };

  const content = (
    <Link data-id="CardPost" className={cn('group w-full', className)} to={href}>
      <div className={cn('flex flex-col p-1 w-full overflow-hidden')}>
        <CardPostImage layout={layout} post={post} />

        {renderMeta()}
      </div>
    </Link>
  );

  if (neverUpdate) {
    return content;
  }

  const getWarning = (): string | undefined => {
    if (!href || href === '#') {
      return 'Este enlace no tiene un link establecido. Actualice el tipo de enlace.';
    }

    return undefined;
  };

  return (
    <UpdateSomethingContainer
      warning={getWarning()}
      title="Editar esta publicación"
      className="w-full height-webkit-fill-available"
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
