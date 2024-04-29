import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGripLinesVerticalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M11 3v26h2V3h-2zm8 0v26h2V3h-2z' }),
  );
}
export default SvgGripLinesVerticalSolid;
