import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgYoutubeSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm9 4.08s-4.39 0-5.47.29c-.6.17-1.08.64-1.24 1.25C9 13.71 9 16.01 9 16.01s0 2.3.29 3.4c.16.6.64 1.06 1.24 1.22 1.08.29 5.47.29 5.47.29s4.39 0 5.47-.29c.6-.17 1.08-.62 1.24-1.23.29-1.09.29-3.39.29-3.39s0-2.29-.29-3.39c-.16-.61-.64-1.08-1.24-1.25-1.08-.29-5.47-.29-5.47-.29zm-2 2.076l5 2.856-5 2.842v-5.698z'
    })
  );
}
export default SvgYoutubeSquare;
