import { ProductDetailsProps } from '../types';

export type ProductDetails1Props = ProductDetailsProps;
export const ProductDetails1 = ({ title, value, className }: ProductDetails1Props) => {
  return (
    <div className={className}>
      <h2 className="text-sm font-medium text-gray-900">{title}</h2>

      <div className="mt-4 space-y-6">
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
};
