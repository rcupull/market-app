import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEnvelopeOpenTextSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10 5v1.9l-5.992 3.903V27h23.984V10.803L22 6.898V5H10zm2 2h8v7.682l-4 2.591-4-2.591V7zm1 2v2h6V9h-6zm-3 .285v4.102l-3.156-2.045L10 9.285zm12 0l3.156 2.057L22 13.387V9.285zM13 12v2h6v-2h-6zm-6.992 1.184L16 19.656l9.992-6.472V25H6.008V13.184z'
    })
  );
}
export default SvgEnvelopeOpenTextSolid;
