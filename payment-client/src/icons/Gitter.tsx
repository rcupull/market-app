import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGitter(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M6 2v17h2V2H6zm6 4v24h2V6h-2zm6 0v24h2V6h-2zm6 0v13h2V6h-2z' })
  );
}
export default SvgGitter;
