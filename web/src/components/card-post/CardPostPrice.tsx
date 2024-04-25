import { PostCardLayout } from 'types/business';
import { Post, PostCurrency } from 'types/post';
import { cn } from 'utils/general';

const renderPriceCurrency = (
  price: number,
  currency: PostCurrency,
  layout: PostCardLayout['price'],
) => {
  const priceToRender = price.toFixed(2);

  if (layout === 'basic') {
    return `${priceToRender} ${currency}`;
  }

  if (layout === 'smallerCurrency') {
    return (
      <div>
        {`${priceToRender}`}
        <span className="text-sm ml-1">{currency}</span>
      </div>
    );
  }

  if (layout === 'usdCurrencySymbol') {
    return `$${priceToRender}`;
  }

  return null;
};

export interface CardPostPriceProps {
  post: Post;
  layout?: PostCardLayout;
}

export const CardPostPrice = ({ post, layout }: CardPostPriceProps) => {
  const priceLayout = layout?.price;
  const discountLayout = layout?.discount;
  const { price, currency, discount } = post;

  const hasDiscount = !!discount && !!discountLayout && discountLayout !== 'none';

  const renderDiscount = () => {
    if (!discount) {
      return null;
    }

    if (discountLayout === 'savedMoney') {
      const oldPrice = price + discount;
      return (
        <div className="text-gray-400 line-through text-sm ml-2">
          {renderPriceCurrency(oldPrice, currency, priceLayout)}
        </div>
      );
    }

    if (discountLayout === 'savedPercent') {
      const percentToSave = ((discount / price) * 100).toFixed(1);
      return (
        <div className="border border-red-500 text-red-500 text-sm ml-2 p-0.5">{`-${percentToSave}%`}</div>
      );
    }

    return null;
  };

  if (priceLayout !== 'none') {
    return (
      <div className="mt-1 text-lg font-medium text-gray-900 flex items-center">
        <div
          className={cn({
            'text-red-500 font-bold': hasDiscount,
          })}
        >
          {renderPriceCurrency(price, currency, priceLayout)}
        </div>

        {renderDiscount()}
      </div>
    );
  }

  return <></>;
};
