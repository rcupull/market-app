import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLevelUpAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17 4l-.719.688-8.5 8.5 1.438 1.439L16 7.844V26H6v2h12V7.844l6.781 6.781 1.438-1.438-8.5-8.5L17 4z'
    })
  );
}
export default SvgLevelUpAltSolid;
