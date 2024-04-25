import { PostCardSize } from 'types/business';
import { cn } from 'utils/general';

export const getCardPostSizes = ({ size }: { size: PostCardSize | undefined }) => {
  return cn({
    'max-w-[20rem] sm:w-[12rem] sm:h-[15rem]': size === 'small',
    'max-w-[20rem] sm:w-[16rem] sm:h-[20rem]': size === 'medium',
    'max-w-[20rem] sm:w-[20rem] sm:h-[24rem]': size === 'long',
  });
};

export const getCardPostImageSizes = ({
  rounded,
  size,
}: {
  size: PostCardSize | undefined;
  rounded: boolean;
}) => {
  if (rounded) {
    return cn({
      'max-w-[20rem] sm:w-[11.5rem] sm:h-[10rem]': size === 'small',
      'max-w-[20rem] sm:w-[15.5rem] sm:h-[14rem]': size === 'medium',
      'max-w-[20rem] sm:w-[19.5rem] sm:h-[19rem]': size === 'long',
    });
  }

  return cn({
    'max-w-[20rem] sm:w-[11.5rem] sm:h-[12rem]': size === 'small',
    'max-w-[20rem] sm:w-[15.5rem] sm:h-[15rem]': size === 'medium',
    'max-w-[20rem] sm:w-[19.5rem] sm:h-[20rem]': size === 'long',
  });
};
