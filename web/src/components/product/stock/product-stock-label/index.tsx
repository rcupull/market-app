import { PostCardLayout } from 'types/business';
import { Post } from 'types/post';
import { cn, isNullOrUndefined } from 'utils/general';

export interface ProductStockLabelProps {
  post: Post;
  layout?: PostCardLayout;
}

export const ProductStockLabel = ({ post, layout }: ProductStockLabelProps) => {
  const { stockAmountAvailable } = post;

  if (isNullOrUndefined(stockAmountAvailable)) {
    return <></>;
  }

  const getLabel = () => {
    if (stockAmountAvailable === 0) {
      return 'Agotados';
    }

    return `Quedan: ${stockAmountAvailable}`;
  };

  return (
    <span
      className={cn({
        'text-gray-50 bg-green-800 px-2 py-0.5 rounded-2xl': stockAmountAvailable !== 0,
        'text-red-500': stockAmountAvailable === 0,
        'text-xs !py-0 !px-1': layout?.size === 'small',
        'text-lg': layout?.size === 'medium',
        'text-xl': layout?.size === 'long',
      })}
    >
      {getLabel()}
    </span>
  );
};
