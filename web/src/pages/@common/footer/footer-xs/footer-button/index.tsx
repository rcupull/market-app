import { IconButton } from 'components/icon-button';

import { StyleProps } from 'types/general';

export interface FooterButtonProps {
  label: string;
  svg: React.FunctionComponent<StyleProps>;
}

export const FooterButton = ({ label, svg: Svg }: FooterButtonProps) => {
  return (
    <div className="flex flex-col items-center">
      <IconButton className='!-m-1' svg={<Svg className="!size-7" />} />
      <span className='text-xs font-semibold'>{label}</span>
    </div>
  );
};
