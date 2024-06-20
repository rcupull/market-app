import { PostCardSize } from 'types/business';
import { cn } from 'utils/general';

export const getCardPostSizes = ({ size }: { size: PostCardSize | undefined }) => {
  return cn({
    'max-w-[20rem] sm:w-[12rem] sm:h-[15rem]': size === 'small',
    'max-w-[20rem] sm:w-[16rem] sm:h-[20rem]': size === 'medium',
    'max-w-[20rem] sm:w-[20rem] sm:h-[24rem]': size === 'long',
  });
};

export const useCardPostImageSizes = ({
  rounded,
  size,
}: {
  size: PostCardSize | undefined;
  rounded: boolean;
}) => {
  if (rounded) {
    return cn({
      'h-[4rem]': size === 'small',
      'h-[8rem]': size === 'medium',
      'h-[10rem]': size === 'long',
    });
  }

  return cn({
    'h-[6rem]': size === 'small',
    'h-[15rem]': size === 'medium',
    'h-[20rem]': size === 'long',
  });
};

export const getCardPostMetaSizes = ({ size }: { size: PostCardSize | undefined }) => {
  return cn({
    'text-sm': size === 'small',
    'text-lg': size === 'medium',
    'text-xl': size === 'long',
  });
};
