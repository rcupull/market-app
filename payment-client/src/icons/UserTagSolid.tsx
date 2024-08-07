import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserTagSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-3.9 0-7 3.1-7 7a6.96 6.96 0 003.07 5.813C8.51 19.346 6 22.892 6 27h2c0-4.4 3.6-8 8-8 3.9 0 7-3.1 7-7s-3.1-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm5 12c-1.1 0-2 .9-2 2v4.4l6 6c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l3.6-3.6c.4-.4.6-.9.6-1.4 0-.5-.2-1-.6-1.4l-6-6H21zm0 2h3.6l5.4 5.4-3.6 3.6-5.4-5.4V21zm2 1a1 1 0 000 2 1 1 0 000-2z'
    })
  );
}
export default SvgUserTagSolid;
