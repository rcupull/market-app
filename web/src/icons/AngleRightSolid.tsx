import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M12.969 4.281L11.53 5.72 21.812 16l-10.28 10.281 1.437 1.438 11-11 .687-.719-.687-.719z',
    }),
  );
}
export default SvgAngleRightSolid;
