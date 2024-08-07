import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWhmcs(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.8 4l-.6 2.8-1.2.3L11 5 9.1 6.1 9.9 9l-.8.8L6.2 9l-1.1 1.9L7.2 13l-.3 1-2.9.8V17l2.9.8.3 1.2-2 2 1 1.9 3-.8.7.9-.9 2.7 2 1.2 2-2.1 1.1.3.7 2.9h2.3l.7-2.9 1.2-.3 2.1 2.1 2-1.2-.9-2.8.8-.8 2.9.8 1-2-2.1-1.9.2-1.2 3-.7V15l-2.6-.9.4 1.1.1.4-.3.2-1.1.6-.3.2-.3-.3-.9-1h-.1l-.3 1.3-.1.4h-1.1c-.5 2.5-2.8 4.4-5.5 4.4-3.2 0-5.7-2.6-5.7-5.7 0-2.7 2-4.9 4.5-5.5v-1l.3-.1 1.3-.4-.9-.9-.2-.2.2-.3.6-1 .2-.3.3.2 1.2.3-.6-2.5h-2.3zM21 4l-.3 1.4-.7.2-1-1.1-1 .6.4 1.5-.5.4-1.5-.4-.6 1 1.1 1.1-.1.5-1.5.4v1.2l1.6.4.1.7-1.2 1.1.6 1 1.6-.4.4.5-.4 1.4 1.1.6 1-1.1.6.2.4 1.5h1.2l.4-1.5.6-.2 1.1 1.2 1.1-.7-.6-1.5.4-.4 1.5.5.5-1.1-1.1-1 .1-.7 1.7-.4V9.8l-1.5-.5-.1-.6 1.1-1.1-.5-1-1.7.4-.4-.4.4-1.5-1-.6-1.1 1.1-.6-.2-.4-1.4H21zm.6 3.3c1.7 0 3 1.4 3 3 .1 1.7-1.3 3-3 3s-3-1.4-3-3c0-1.7 1.4-3 3-3z'
    })
  );
}
export default SvgWhmcs;
