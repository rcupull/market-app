import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCrossSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M13 3v6H7v6h6v14h6V15h6V9h-6V3zm2 2h2v6h6v2h-6v14h-2V13H9v-2h6z' })
  );
}
export default SvgCrossSolid;
