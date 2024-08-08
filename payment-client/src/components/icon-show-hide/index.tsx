import SvgEye from 'icons/Eye';
import SvgEyeSlash from 'icons/EyeSlash';
import { StyleProps } from 'types/general';

export interface IconShowHideProps extends StyleProps {
  hidden?: boolean;
}

export const IconShowHide = ({ hidden, className }: IconShowHideProps) => {
  const Icon = hidden ? SvgEyeSlash : SvgEye;
  return <Icon className={className} />;
};
