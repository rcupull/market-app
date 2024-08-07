import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCropAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M8 4v4H4v2h4v14h14v4h2v-4h4v-2H10V4H8zm4 4v2h10v10h2V8H12z' })
  );
}
export default SvgCropAltSolid;
