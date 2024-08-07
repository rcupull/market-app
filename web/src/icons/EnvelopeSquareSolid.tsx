import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEnvelopeSquareSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm2 3v12h14V10zm2.813 2h8.374L16 14.781zM11 13.875l4.438 2.969.562.343.563-.343L21 13.875V20H11z'
    })
  );
}
export default SvgEnvelopeSquareSolid;
