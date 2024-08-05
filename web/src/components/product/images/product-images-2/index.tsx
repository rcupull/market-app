import { useEffect, useState } from 'react';

import { UnknownImage } from 'components/unknown-image';

import { ProductImagesProps } from '../types';

import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { cn, isEqualObj } from 'utils/general';

export type ProductImages2Props = ProductImagesProps;
export const ProductImages2 = ({ value, className }: ProductImages2Props) => {
  const [selectedImage, setSelectedImage] = useState<Image>();

  useEffect(() => {
    if (value?.length) {
      setSelectedImage(value[0]);
    }
  }, [value]);

  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row justify-center gap-2 w-full min-h-[20rem] lg:min-h-[30rem]',
        className
      )}
    >
      <div className="flex flex-row sm:flex-col gap-2 overflow-auto flex-shrink-0">
        {value?.map((image, index) => {
          const { src, alt } = image;

          const selected = isEqualObj(image, selectedImage);
          return (
            <img
              onClick={() => setSelectedImage(image)}
              key={index}
              src={getImageEndpoint(src)}
              alt={alt}
              className={cn('h-20 w-20 object-cover object-center cursor-pointer', {
                'border-2 border-gray-400 rounded-sm': selected
              })}
            />
          );
        })}
      </div>
      <div className="flex-1 flex items-center justify-center border-2 border-gray-200 rounded-md">
        {selectedImage ? (
          <img
            src={getImageEndpoint(selectedImage.src)}
            alt={selectedImage.alt}
            className="object-cover object-center h-80 w-96"
          />
        ) : (
          <UnknownImage className="border-2 rounded-lg" />
        )}
      </div>
    </div>
  );
};
