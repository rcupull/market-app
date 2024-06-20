import { PostCardLayout } from 'types/business';
import { Post } from 'types/post';
import { cn, isNullOrUndefined } from 'utils/general';

export interface CardPostStockAmountProps {
  post: Post;
  layout?: PostCardLayout;
}

export const CardPostStockAmount = ({ post, layout }: CardPostStockAmountProps) => {
  const { stockAmount } = post;

  if (isNullOrUndefined(stockAmount)) {
    return <></>;
  }

  const getLabel = () => {
    if (stockAmount === 0) {
      return 'Agotados';
    }

    return `Quedan: ${stockAmount}`;
  };

  return (
    <span
      className={cn({
        'text-gray-50 bg-green-800 px-2 py-0.5 rounded-xl': stockAmount !== 0,
        'text-red-500': stockAmount === 0,
        'text-xs !py-0 !px-1': layout?.size === 'small',
        'text-lg': layout?.size === 'medium',
        'text-xl': layout?.size === 'long',
      })}
    >
      {getLabel()}
    </span>
  );
};
