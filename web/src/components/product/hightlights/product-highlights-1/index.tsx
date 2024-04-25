import { ProductHighLightsProps } from '../types';

export type ProductHighLights1Props = ProductHighLightsProps;

export const ProductHighLights1 = ({ title, value, className }: ProductHighLights1Props) => {
  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>

      <div className="mt-4">
        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
          {value?.map((item) => (
            <li key={item} className="text-gray-400">
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
