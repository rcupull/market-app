import { IconButton } from 'components/icon-button';
import { Tooltip } from 'components/tooltip';

import SvgQuestionCircle from 'icons/QuestionCircle';
import { StyleProps } from 'types/general';

export interface ButtonDescriptionProps extends StyleProps {
  description: React.ReactNode;
}

export const ButtonDescription = ({ description, className }: ButtonDescriptionProps) => {
  return (
    <Tooltip content={description} className={className}>
      <IconButton svg={SvgQuestionCircle} />
    </Tooltip>
  );
};
