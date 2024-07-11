import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUsersCogSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M8 5c-3.3 0-6 2.7-6 6 0 2 1 3.8 2.5 4.8C1.8 17.2 0 19.9 0 23h2c0-3.3 2.7-6 6-6s6 2.7 6 6h2c0-3.2 2.6-5.9 5.8-6h.2c2.5 0 4.6-1.5 5.5-3.6 0 0 0-.1.1-.1.1-.1.1-.3.1-.4 0-.1 0-.1.1-.2 0-.1.1-.3.1-.4 0-.1 0-.2.1-.3 0-.1 0-.2.1-.3v-.6c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2 1 3.8 2.5 4.8-1.5.7-2.7 1.9-3.5 3.3-.8-1.4-2-2.6-3.5-3.3C13 14.8 14 13 14 11c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm14 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm2.1 11v2.1c-.6.1-1.2.4-1.7.7l-1.5-1.5-1.4 1.4 1.5 1.5c-.4.5-.6 1.1-.7 1.8H18v2h2.1c.1.6.4 1.2.7 1.8l-1.5 1.5 1.4 1.4 1.5-1.5c.5.3 1.1.6 1.7.7V32h2v-2.1c.6-.1 1.2-.4 1.7-.7l1.5 1.5 1.4-1.4-1.5-1.5c.4-.5.6-1.1.7-1.8H32v-2h-2.1c-.1-.6-.4-1.2-.7-1.8l1.5-1.5-1.4-1.4-1.5 1.5c-.5-.3-1.1-.6-1.7-.7V18h-2zm.9 4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 2a.872.872 0 00-.367.086 1.138 1.138 0 00-.32.227 1.138 1.138 0 00-.227.32A.872.872 0 0024 25c0 .125.031.25.086.367.055.117.133.227.227.32.093.094.203.172.32.227A.872.872 0 0025 26c.5 0 1-.5 1-1s-.5-1-1-1z',
    }),
  );
}
export default SvgUsersCogSolid;
