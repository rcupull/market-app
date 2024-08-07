import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgQuinscape(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12c1.315 0 2.568-.236 3.75-.629a6.51 6.51 0 01-.447-.38C15.253 26.883 12 23.574 12 19.5a7.5 7.5 0 017.5-7.5c4.075 0 7.384 3.253 7.49 7.303.133.144.26.293.381.447.393-1.182.629-2.435.629-3.75 0-6.627-5.373-12-12-12zm7 14a5 5 0 000 10 5 5 0 000-10z'
    })
  );
}
export default SvgQuinscape;
