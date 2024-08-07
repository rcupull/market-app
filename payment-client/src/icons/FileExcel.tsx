import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileExcel(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V9.6l-.3-.3-6-6-.3-.3H6zm2 2h10v6h6v16H8V5zm12 1.4L22.6 9H20V6.4zM11 13l3.8 5.5L11 24h2.4l2.6-3.8 2.6 3.8H21l-3.8-5.5L21 13h-2.4L16 16.8 13.4 13H11z'
    })
  );
}
export default SvgFileExcel;
