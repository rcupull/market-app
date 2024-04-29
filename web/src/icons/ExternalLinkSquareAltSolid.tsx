import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgExternalLinkSquareAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm6 3v2h5.563L9.28 21.281l1.438 1.438L20 13.437V19h2v-9z',
    }),
  );
}
export default SvgExternalLinkSquareAltSolid;
