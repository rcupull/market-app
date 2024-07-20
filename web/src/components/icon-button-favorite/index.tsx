import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgHeart from 'icons/Heart';
import SvgHeartSolid from 'icons/HeartSolid';
import { cn } from 'utils/general';

export interface IconButtonAddProps extends IconButtonProps {
  fill?: boolean;
}

export const IconButtonFavorite = ({ fill, ...props }: IconButtonAddProps) => {
  const SvgComponent = fill ? SvgHeartSolid : SvgHeart;

  return (
    <IconButton
      svg={({ className }) => <SvgComponent className={cn('fill-red-500', className)} />}
      title="Favorito"
      {...props}
    />
  );
};
