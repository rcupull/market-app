import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTeethOpenSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10 3c-4.963 0-9 4.037-9 9v1c0 1.65 1.35 3 3 3 .77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78h1c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78h1c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78h1c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78h1c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78 1.65 0 3-1.35 3-3v-1c0-4.963-4.037-9-9-9H10zm0 2h12c2.798 0 5.213 1.654 6.332 4.033C28.222 9.021 28.113 9 28 9c-.61 0-1.17.18-1.64.49A3.49 3.49 0 0023.5 8c-.76 0-1.46.25-2.03.66A3.514 3.514 0 0018.5 7c-.98 0-1.86.41-2.5 1.06A3.498 3.498 0 0013.5 7c-1.25 0-2.35.67-2.97 1.66C9.96 8.25 9.26 8 8.5 8c-1.18 0-2.23.59-2.86 1.49C5.17 9.18 4.61 9 4 9c-.113 0-.222.02-.332.033C4.788 6.654 7.202 5 10 5zm3.5 4c.83 0 1.5.67 1.5 1.5V13c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-2.5c0-.83.67-1.5 1.5-1.5zm5 0c.83 0 1.5.67 1.5 1.5V13c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-2.5c0-.83.67-1.5 1.5-1.5zm-10 1c.83 0 1.5.67 1.5 1.5V13c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-1.5c0-.83.67-1.5 1.5-1.5zm15 0c.83 0 1.5.67 1.5 1.5V13c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1.5c0-.83.67-1.5 1.5-1.5zM4 11c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm24 0c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zM4 18c-1.65 0-3 1.35-3 3v1c0 3.859 3.141 7 7 7h16c3.859 0 7-3.141 7-7v-1c0-1.65-1.35-3-3-3-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78h-1c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78h-1c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78h-1c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H8c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1-1.1 0-2-.9-2-2 0-.55.45-1 1-1zm5 0h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1zm5 0h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1zm5 0h1c.55 0 1 .45 1 1 0 1.1-.9 2-2 2-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM5.8 23.38C6.54 24.36 7.69 25 9 25c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78h1c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78h1c.77 0 1.47-.3 2-.78.53.48 1.23.78 2 .78 1.31 0 2.46-.64 3.2-1.62.5.39 1.12.62 1.8.62.208 0 .413-.022.61-.063A5.007 5.007 0 0124 27H8a5.007 5.007 0 01-4.61-3.063c.197.041.402.063.61.063.68 0 1.3-.23 1.8-.62z'
    })
  );
}
export default SvgTeethOpenSolid;