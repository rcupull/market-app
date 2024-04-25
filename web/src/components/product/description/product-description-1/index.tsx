import { ProductDescriptionProps } from '../types';

export type ProductDescription1Props = ProductDescriptionProps;

export const ProductDescription1 = ({ value, className }: ProductDescription1Props) => {
  return (
    <div className={className}>
      <h3 className="sr-only">Description</h3>

      <div className="space-y-6">
        <p className="text-base text-gray-900">{value}</p>
      </div>
    </div>
  );
};
