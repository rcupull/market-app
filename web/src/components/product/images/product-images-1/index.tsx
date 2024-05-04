import { UnknownImage } from 'components/unknown-image';

import { ProductImagesProps } from '../types';

import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { cn } from 'utils/general';

export type ProductImages1Props = ProductImagesProps;
export const ProductImages1 = ({ value, className }: ProductImages1Props) => {
  const renderImage = (image: Image | undefined): React.ReactNode => {
    if (!image) {
      return <UnknownImage className="h-full w-full border-2 rounded-lg" />;
    }

    const { src, alt } = image;

    return (
      <img
        src={getImageEndpoint(src)}
        alt={alt}
        className="h-full w-full object-cover object-center"
      />
    );
  };

  return (
    <div
      className={cn(
        'mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8',
        className,
      )}
    >
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        {renderImage(value?.[0])}
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          {renderImage(value?.[1])}
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          {renderImage(value?.[2])}
        </div>
      </div>
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        {renderImage(value?.[3])}
      </div>
    </div>
  );
};
