import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

import { IconButton } from 'components/icon-button';
import { Tooltip } from 'components/tooltip';

import { StyleProps } from 'types/general';

export interface ButtonDescriptionProps extends StyleProps {
  description: React.ReactNode;
}

export const ButtonDescription = ({ description, className }: ButtonDescriptionProps) => {
  return (
    <Tooltip content={description} className={className}>
      <IconButton svg={QuestionMarkCircleIcon} />
    </Tooltip>
  );
};
