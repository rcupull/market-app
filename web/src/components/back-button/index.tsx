import { IconButton, IconButtonProps } from 'components/icon-button';

import { useRouter } from 'hooks/useRouter';

import SvgArrowLeftSolid from 'icons/ArrowLeftSolid';
import { cn } from 'utils/general';

export interface BackButtonProps extends IconButtonProps {}

export const BackButton = ({ className, ...omittedProps }: BackButtonProps) => {
  const { onBack } = useRouter();
  return (
    <IconButton
      onClick={onBack}
      svg={SvgArrowLeftSolid}
      className={cn('ring-0', className)}
      {...omittedProps}
    />
  );
};
