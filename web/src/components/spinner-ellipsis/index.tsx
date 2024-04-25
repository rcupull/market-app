import { Ellipsis } from 'react-css-spinners';

import { StyleProps } from 'types/general';

export interface SpinnerEllipsisProps extends StyleProps {
  className?: string;
  color?: string;
  size?: number;
}

export const SpinnerEllipsis = ({
  className,
  ...omittedProps
}: SpinnerEllipsisProps): JSX.Element => (
  <div className={className}>
    <Ellipsis color="rgba(0,0,0, 0.5)" {...omittedProps} />
  </div>
);
