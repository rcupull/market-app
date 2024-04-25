import { Post } from 'types/post';
import { isNullOrUndefined } from 'utils/general';

export interface CardPostStockAmountProps {
  post: Post;
}

export const CardPostStockAmount = ({ post }: CardPostStockAmountProps) => {
  const { stockAmount } = post;

  if (isNullOrUndefined(stockAmount)) {
    return <></>;
  }

  if (stockAmount === 0) {
    return <span className="text-red-500 font-semibold">Agotados</span>;
  }

  return (
    <span className="text-gray-50 bg-green-800 px-2 py-0.5 rounded-xl font-semibold ">{`Disponibles: ${stockAmount}`}</span>
  );
};
