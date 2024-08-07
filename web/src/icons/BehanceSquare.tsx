import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBehanceSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm2 4.37v8.61h4.18c1.56-.01 3.03-.76 3.03-2.51 0-1.09-.52-2.01-1.57-2.31.77-.38 1.17-.8 1.17-1.66 0-1.72-1.27-2.13-2.75-2.13H9zm9.14.63v.85h3.48V12h-3.48zm-7.24.69h1.78c.67 0 1.29.19 1.29.98 0 .73-.48 1.03-1.16 1.03H10.9v-2.01zm9.06.74c-1.89 0-3.18 1.41-3.18 3.29 0 1.94 1.21 3.28 3.18 3.28 1.49 0 2.46-.67 2.92-2.1h-1.51c-.17.53-.83.81-1.35.81-1.01 0-1.53-.59-1.53-1.58h4.49c.01-.1.02-.22.02-.33 0-1.84-1.09-3.37-3.04-3.37zm-.06 1.28c.87 0 1.3.51 1.37 1.34h-2.78c.05-.82.59-1.34 1.41-1.34zm-9.01 1.42h2.07c.83 0 1.36.35 1.36 1.24 0 .86-.63 1.13-1.4 1.13h-2.03v-2.37z'
    })
  );
}
export default SvgBehanceSquare;
