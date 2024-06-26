import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFilePrescriptionSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M6 3v26h20V9.6l-.3-.3-6-6-.3-.3H6zm2 2h10v6h6v16H8V5zm12 1.4L22.6 9H20V6.4zM11 11v9h2v-3h.6l2.5 4.4L14 25h2l1-1.8 1 1.8h2l-2-3.6 2-3.4h-2l-1 1.7-1.7-3c1-.5 1.6-1.5 1.6-2.7 0-1.6-1.4-3-3-3H11zm2 2h1c.6 0 1 .4 1 1s-.4 1-1 1h-1v-2z',
    })
  );
}
export default SvgFilePrescriptionSolid;
