import { ButtonSvg } from 'components/button';
import { IconButton } from 'components/icon-button';
import { Tooltip } from 'components/tooltip';

import SvgQuestionCircle from 'icons/QuestionCircle';
import { StyleProps } from 'types/general';

export interface ButtonDescriptionProps extends StyleProps {
  description: React.ReactNode;
  svg?: ButtonSvg;
}

export const ButtonDescription = ({ description, className, svg }: ButtonDescriptionProps) => {
  return (
    <Tooltip content={description} className={className}>
      <IconButton svg={svg || SvgQuestionCircle} />
    </Tooltip>
  );
};
