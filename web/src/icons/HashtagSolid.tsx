import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHashtagSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11 5v6H5v2h6v6H5v2h6v6h2v-6h6v6h2v-6h6v-2h-6v-6h6v-2h-6V5h-2v6h-6V5zm2 8h6v6h-6z'
    })
  );
}
export default SvgHashtagSolid;
