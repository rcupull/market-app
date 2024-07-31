import { IconButton } from 'components/icon-button';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterButtonProps {
  label: React.ReactNode;
  svg: React.FunctionComponent<StyleProps>;
  active?: boolean;
}

export const FooterButton = ({ label, svg: Svg, active }: FooterButtonProps) => {
  return (
    <div className="flex flex-col items-center">
      <IconButton
        className={cn('!-m-1', {
          'fill-indigo-700': active,
        })}
        svg={<Svg className="!size-7" />}
      />
      <div
        className={cn('text-xs font-semibold text-nowrap', {
          'text-indigo-700': active,
        })}
      >
        {label}
      </div>
    </div>
  );
};
