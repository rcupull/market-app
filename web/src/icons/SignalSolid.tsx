import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSignalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M21 4v24h6V4zm-8 7v17h6V11zm-8 7v10h6V18z' }),
  );
}
export default SvgSignalSolid;
