import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgObjectUngroupSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v4h1v10H5v4h4v-1h2v2h-1v4h4v-1h10v1h4v-4h-1V14h1v-4h-4v1h-2V9h1V5h-4v1H9V5zm4 3h10v1h1v10h-1v1H9v-1H8V9h1zm13 5h2v1h1v10h-1v1H14v-1h-1v-2h6v1h4v-4h-1z'
    })
  );
}
export default SvgObjectUngroupSolid;
