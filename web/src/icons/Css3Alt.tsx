import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCss3Alt(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 4l2 21 8 3 8-3 2-21H6zm3.332 3h13.32l-.261 3-5.696 3h5.428l-.512 6.008.02-.008-.276 3L16 24l-5.365-2-.33-4h3.021l.156 2.033 2.518.871 2.521-.853.346-4.051h-8.736l-.258-3 5.91-3H9.61l-.277-3z'
    })
  );
}
export default SvgCss3Alt;
