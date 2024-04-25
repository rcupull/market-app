import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';

export interface IconShowHideProps extends StyleProps {
  hidden?: boolean;
}

export const IconShowHide = ({ hidden, className }: IconShowHideProps) => {
  const Icon = hidden ? EyeSlashIcon : EyeIcon;
  return <Icon className={className} />;
};
