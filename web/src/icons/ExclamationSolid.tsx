import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgExclamationSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M13 4v16h6V4zm2 2h2v12h-2zm-2 16v6h6v-6zm2 2h2v2h-2z' })
  );
}
export default SvgExclamationSolid;
