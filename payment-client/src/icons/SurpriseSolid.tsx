import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSurpriseSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-4.5 5c-.828 0-1.5 1.121-1.5 2.5s.672 2.5 1.5 2.5 1.5-1.121 1.5-2.5-.672-2.5-1.5-2.5zm9 0c-.828 0-1.5 1.121-1.5 2.5s.672 2.5 1.5 2.5 1.5-1.121 1.5-2.5-.672-2.5-1.5-2.5zM16 17c-2.293 0-4 1.855-4 4 0 .988.355 1.973 1.156 2.469.801.496 1.688.531 2.844.531s2.043-.035 2.844-.531C19.644 22.973 20 21.989 20 21c0-2.145-1.707-4-4-4zm0 2c1.293 0 2 .828 2 2 0 .668-.04.691-.188.781-.148.09-.757.219-1.812.219-1.055 0-1.664-.129-1.813-.219-.148-.09-.187-.113-.187-.781 0-1.172.707-2 2-2z'
    })
  );
}
export default SvgSurpriseSolid;
