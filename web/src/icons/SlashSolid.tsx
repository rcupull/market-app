import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M26.281 4.281l-22 22L5.72 27.72l22-22z' }),
  );
}
export default SvgSlashSolid;
