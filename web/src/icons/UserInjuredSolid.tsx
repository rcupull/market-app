import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserInjuredSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-3.9 0-7 3.1-7 7a6.96 6.96 0 003.064 5.809C8.838 19.182 6.463 22.194 6.1 25.9c-.1.5.1 1.1.5 1.5.3.4.9.6 1.4.6h9c1.7 0 3-1.3 3-3s-1.3-3-3-3h-3.809l-.796-2.125A7.89 7.89 0 0116 19c4.4 0 8 3.6 8 8h2c0-4.107-2.51-7.655-6.07-9.19A6.96 6.96 0 0023 12c0-3.9-3.1-7-7-7zm0 2c.419 0 .818.063 1.205.156L13.65 10h-2.244c.76-1.779 2.51-3 4.594-3zm3.176 1.14A4.895 4.895 0 0120.594 10h-3.742l2.324-1.86zM11 12h10c0 2.8-2.2 5-5 5s-5-2.2-5-5zm-.305 9.041L12.555 26H8.1a7.984 7.984 0 012.595-4.959zM13.941 24H17c.6 0 1 .4 1 1s-.4 1-1 1h-2.309l-.75-2z'
    })
  );
}
export default SvgUserInjuredSolid;
