import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWolfPackBattalion(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M7.4 3c-.9 3.1-.2 6 0 6.6.8-.3 2.5-1.9.3-3.7 1.3.4 2 1.5 2.1 2.5C10 9.8 8.1 11 7.1 11c-1.6.1-3.1 1.7-3.1 3l1.1-.5c-.3.9-.6 1.8-.4 2.9l1.3-.3c-.8 1.3-.5 3.3-.4 4.3l1.3-.7.4 1.8 1.2-.3.5 1.5 1.3-1.1-1 .4-.4-1.7-.9.3-.3-1.7-1.4.4c-.2-1.3.1-2.5.7-3.7l-1.5-.4c.5-2.2 1.8-2.6 3.2-2.7.5 1.6.3 2.9-.1 4.1 4.1 2.9 3.9 6 4.1 7.6.2 1.5.2 4.5 1.3 4.9v-1.5l.3-.4.3.6.5-.8.6 1.1.4-1.2.5.8.3-.6.3.4V29c1.1-.4 1.1-3.4 1.3-4.9.2-1.6 0-4.7 4.1-7.6-.4-1.2-.6-2.5-.1-4.1 1.4.2 2.7.5 3.2 2.7l-1.5.4c.6 1.2.9 2.4.7 3.7l-1.4-.4-.5 1.8-.9-.4-.4 1.7-1-.4 1.3 1.1.4-1.4 1.2.3.4-1.8 1.3.7c0-1 .4-2.9-.4-4.3l1.3.3c.2-1.1-.1-2-.4-2.9l1.2.5c0-1.3-1.5-2.9-3.1-3-1-.1-2.9-1.3-2.7-2.6.1-1 .8-2.2 2.1-2.5-2.2 1.9-.5 3.4.3 3.7.2-.6.9-3.5 0-6.6-2 1.2-4.4 3.3-4.6 7.5l-2.8 1.8L16 17l5.2-2.8.4.4-.9.2-2.2 2-.8-.3-1.4 2.5-.2 6 1.1.8-1.6.8-1.6-.8 1.1-.8-.2-6.1-1.4-2.5-.8.3-2.2-2-.9-.2.4-.4 5 2.9-.2-4.7-2.8-1.8C11.8 6.3 9.5 4.2 7.4 3zm.8 10.5c-.9.1-1.8.4-2.3 1.4.7.2 1.2.3 2.2.7 0-.6.1-1.4.1-2.1zm14.6 0c0 .7.1 1.5.1 2.1 1-.4 1.5-.5 2.2-.7-.5-1-1.3-1.3-2.3-1.4zM8.1 15.8c-1 .7-1.4 1.7-1.5 2.9.6-.2 1.2-.5 1.9-.5-.3-.7-.4-1.5-.4-2.4zm14.8 0c0 .9-.1 1.7-.4 2.4.7 0 1.3.3 1.9.5-.1-1.2-.5-2.2-1.5-2.9zM8.6 18.2c-.2.5-.3 1-.3 1.7l1.2-.3c-.3-.5-.6-.9-.9-1.4zm.9 1.4c0 .6 0 1.1.1 1.6.4-.1.8-.2 1.1-.4-.4-.3-.8-.8-1.2-1.2zm12.9-1.4c-.3.5-.6.9-.9 1.4l1.2.3c0-.7-.1-1.2-.3-1.7zm-.9 1.4c-.4.4-.8.9-1.2 1.2.3.2.7.3 1.1.4.1-.5.1-1 .1-1.6zM10.7 21c.1.3.1.7.2 1.1l.8-.5c-.4-.2-.7-.4-1-.6zm9.6 0c-.3.2-.6.4-1 .6l.8.5c.1-.4.1-.8.2-1.1z',
    }),
  );
}
export default SvgWolfPackBattalion;
