import { ProductPriceProps } from '../types';

export type ProductPrice1Props = ProductPriceProps;

export const ProductPrice1 = ({ currency, price }: ProductPrice1Props) => {
  return (
    <div className="text-3xl tracking-tight text-gray-900">
      {price}
      <span className="text-lg ml-2">{currency}</span>
    </div>
  );
};
