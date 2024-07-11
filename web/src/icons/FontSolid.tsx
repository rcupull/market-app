import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFontSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M15 6L8 26h2l2.094-6h7.812L22 26h2L17 6zm1 2.844L19.188 18h-6.375z',
    }),
  );
}
export default SvgFontSolid;
