import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChrome(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.385 4 4 9.385 4 16s5.385 12 12 12 12-5.385 12-12S22.615 4 16 4zm0 2a9.977 9.977 0 018.922 5.492l-6.807-.004A4.93 4.93 0 0016 11c-1.625 0-3.06.796-3.975 2.006L8.44 9.459A9.966 9.966 0 0116 6zm-8.367 4.523l3.387 5.87a5.015 5.015 0 004.369 4.566l-1.276 4.857A9.982 9.982 0 016 16a9.96 9.96 0 011.633-5.477zm17.808 2.202A9.986 9.986 0 0116 26c-.186 0-.367-.017-.55-.027l3.392-5.871A4.998 4.998 0 0021 16c0-.69-.143-1.348-.398-1.947l4.84-1.328zM16 13c1.671 0 3 1.329 3 3s-1.329 3-3 3-3-1.329-3-3 1.329-3 3-3z'
    })
  );
}
export default SvgChrome;
