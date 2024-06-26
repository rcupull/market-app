import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSteamSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v11l3.813 1.594c.71-.934 1.808-1.559 3.062-1.594l2.156-3.25A4.97 4.97 0 0119 8a5 5 0 015 5 4.97 4.97 0 01-4.75 4.969L16 20.125A3.993 3.993 0 0112 24c-2.21 0-4-1.79-4-4 0-.191.035-.379.063-.563L5 18.157V27h22V5zm14 5c-1.652 0-3 1.348-3 3s1.348 3 3 3 3-1.348 3-3-1.348-3-3-3zm0 1c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2zm-7 7c-.453 0-.883.148-1.219.406l1.594.657c.512.21.777.8.563 1.312-.16.383-.547.625-.938.625a.893.893 0 01-.375-.063l-1.594-.687c.13.98.953 1.75 1.969 1.75a1.999 1.999 0 100-4z',
    })
  );
}
export default SvgSteamSquare;
