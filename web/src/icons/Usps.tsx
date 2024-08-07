import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUsps(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5.6 7c13.6 2.9 17.7 3.5 17.8 4.5 2 0 2.5 0 2.8.4 1.1 1-.8 3.6-.8 3.6-.2.1-21.7 8.5-21.7 8.5h22.7L30 7H5.6zm-.8 4L2 24c10.5-5.2 13.9-6.9 17.2-8.1 3.5-1.1 5.2-1.2 5.5-1.3.2-.2-.2-.4-1.4-.3-2.8.1-7.4 2-9.3 2.9l-1.6-5h10.5c-.1-1-5.4-1.1-12.7-1.2H4.8zm18.4 1.1s-.1-.1-.6.4c-.6.3-2 .3-2 .5s3.8-.2 4.7 0c.5.1-.1 1.1-.2 1.7-.1.3.1.2.1 0 1.4-2.2.8-2.6-.6-2.6h-1.4z'
    })
  );
}
export default SvgUsps;
