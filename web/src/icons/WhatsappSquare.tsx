import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWhatsappSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm9 2c-3.9 0-7 3.1-7 7 0 1.3.4 2.5 1 3.5L9 23l3.5-.9c1 .6 2.2.9 3.5.9 3.9 0 7-3.1 7-7s-3.1-7-7-7zm0 1.5c3 0 5.5 2.5 5.5 5.5S19 21.5 16 21.5c-1 0-1.9-.3-2.7-.7l-.5-.3-.6.2-1 .3.3-1 .2-.6-.3-.5c-.5-.8-.8-1.8-.8-2.8-.1-3.1 2.4-5.6 5.4-5.6zm-2.2 2.6c-.1 0-.3 0-.4.2-.2.1-.6.5-.6 1.3 0 .7.5 1.5.6 1.6.1.1 1.1 1.7 2.7 2.4 1 .4 1.4.5 1.9.4.3-.1 1-.4 1.1-.8.1-.4.1-.7.2-.5 0-.1-.1-.1-.3-.2-.2-.1-1-.5-1.1-.5-.2 0-.3-.1-.4.1-.1.1-.4.5-.5.6-.1.1-.1.1-.3 0-1-.5-1.6-.9-2.2-1.9-.1-.3.2-.3.5-.9.1-.1 0-.2 0-.3-.1-.1-.4-.9-.5-1.2-.2-.3-.3-.3-.4-.3h-.3z'
    })
  );
}
export default SvgWhatsappSquare;
