import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSteamSymbol(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M22 6c-3.254 0-5.905 2.604-5.992 5.838l-3.67 5.246A4.492 4.492 0 0011.5 17c-.948 0-1.826.298-2.553.8L4 15.845v5.377l3.105 1.228A4.504 4.504 0 0011.5 26a4.5 4.5 0 004.418-3.69l5.773-4.326c.103.006.205.016.309.016 3.309 0 6-2.691 6-6s-2.691-6-6-6zm0 2c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm0 1a3 3 0 000 6 3 3 0 000-6zm-10.5 9c1.93 0 3.5 1.57 3.5 3.5S13.43 25 11.5 25a3.5 3.5 0 01-3.19-2.074l2.27.898c.302.12.612.178.918.178a2.5 2.5 0 00.922-4.826l-2.277-.903A3.482 3.482 0 0111.5 18z'
    })
  );
}
export default SvgSteamSymbol;
