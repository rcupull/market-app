import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCopySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M4 4v20h7v-2H6V6h12v1h2V4zm8 4v20h16V8zm2 2h12v16H14z' })
  );
}
export default SvgCopySolid;
