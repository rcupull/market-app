import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAmbulanceSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M18 3c-1.105 0-2 .895-2 2v1H1v19h3.156c.446 1.719 1.992 3 3.844 3 1.852 0 3.398-1.281 3.844-3h8.312c.446 1.719 1.992 3 3.844 3 1.852 0 3.398-1.281 3.844-3H31V13.625l-.25-.281-6-7L24.469 6H20V5c0-1.105-.895-2-2-2zM3 8h20.531L29 14.375V23h-1.156c-.446-1.719-1.992-3-3.844-3-1.852 0-3.398 1.281-3.844 3h-8.312c-.446-1.719-1.992-3-3.844-3-1.852 0-3.398 1.281-3.844 3H3zm11 3v3h-3v2h3v3h2v-3h3v-2h-3v-3zM8 22c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm16 0c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2z'
    })
  );
}
export default SvgAmbulanceSolid;
