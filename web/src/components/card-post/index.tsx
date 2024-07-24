import { Link } from 'react-router-dom';

import { PostShoppingMethod } from 'components/post-shopping-method';
import { ProductStockLabel } from 'components/product/stock/product-stock-label';

import { CardPostImage } from './CardPostImage';
import { CardPostName } from './CardPostName';
import { CardPostPrice } from './CardPostPrice';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessNewUpdatePostModal } from 'pages/@modals/useBusinessNewUpdatePostModal';
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
  const { businessNewUpdatePostModal } = useBusinessNewUpdatePostModal();
  const { metaLayout, size } = layout || {};

  const renderMeta = () => {
    if (metaLayout === 'basic') {
      return (
        <div className="flex items-end flex-wrap flex-shrink-0">
          <div>
            <CardPostName layout={layout} post={post} />
            <CardPostPrice layout={layout} post={post} currency={currency} />
            <ProductStockLabel layout={layout} post={post} />
          </div>
        </div>
      );
    }

    if (metaLayout === 'verticalCentered') {
      return (
        <div className="flex flex-col items-center flex-shrink-0">
          <CardPostName layout={layout} post={post} className="text-center" />
          <CardPostPrice layout={layout} post={post} currency={currency} />
          <ProductStockLabel layout={layout} post={post} />
        </div>
      );
    }

    return <></>;
  };

  const content = (
    <Link data-id="CardPost" className={cn('group w-full', className)} to={href}>
      <div className={cn('flex flex-col p-1 w-full overflow-hidden h-full relative')}>
        <CardPostImage layout={layout} post={post} />

        {renderMeta()}

        <div
          className={cn({
            'ml-auto mt-auto': size === 'small',
            '!absolute right-0 bottom-0': size === 'medium' || size === 'long',
          })}
        >
          <PostShoppingMethod
            layout={layout?.shoppingMethod}
            post={post}
            className={cn({
              '-m-3 size-10': size === 'small',
            })}
          />
        </div>
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
        businessNewUpdatePostModal.open({
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
