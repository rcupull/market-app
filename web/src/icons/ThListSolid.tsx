import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThListSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M4 6v20h24V6zm2 2h5v4H6zm7 0h13v4H13zm-7 6h5v4H6zm7 0h13v4H13zm-7 6h5v4H6zm7 0h13v4H13z',
    }),
  );
}
export default SvgThListSolid;
