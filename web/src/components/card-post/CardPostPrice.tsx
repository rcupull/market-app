import { getCardPostMetaSizes } from './utils';

import { BusinessCurrency, PostCardLayout } from 'types/business';
import { Post } from 'types/post';
import { cn, isNumber } from 'utils/general';

const renderPriceCurrency = (
  price: number,
  currency: BusinessCurrency,
  layout: PostCardLayout['price']
) => {
  const priceToRender = price.toFixed(2);

  if (layout === 'basic') {
    return <div className="text-nowrap">{`${priceToRender} ${currency}`}</div>;
  }

  if (layout === 'smallerCurrency') {
    return (
      <div className="text-nowrap">
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
  currency: BusinessCurrency;
}

export const CardPostPrice = ({ post, layout, currency }: CardPostPriceProps) => {
  const priceLayout = layout?.price;
  const discountLayout = layout?.discount;
  const { price, discount } = post;

  const hasDiscount = !!discount && !!discountLayout && discountLayout !== 'none';

  const renderDiscount = () => {
    if (!discount || !isNumber(price) || !currency) {
      return null;
    }

    if (discountLayout === 'savedMoney') {
      const oldPrice = price + discount;
      return (
        <div className="text-gray-400 line-through text-sm">
          {renderPriceCurrency(oldPrice, currency, priceLayout)}
        </div>
      );
    }

    if (discountLayout === 'savedPercent') {
      const percentToSave = ((discount / price) * 100).toFixed(1);
      return (
        <div className="border border-red-500 text-red-500 text-sm p-0.5">{`-${percentToSave}%`}</div>
      );
    }

    return null;
  };

  if (priceLayout !== 'none' && isNumber(price) && currency) {
    return (
      <div className="mt-1 text-lg font-medium text-gray-900 flex gap-1 items-center flex-wrap">
        <div
          className={cn(
            {
              'text-red-500 font-bold': hasDiscount,
            },
            getCardPostMetaSizes({ size: layout?.size })
          )}
        >
          {renderPriceCurrency(price, currency, priceLayout)}
        </div>

        {renderDiscount()}
      </div>
    );
  }

  return <></>;
};
