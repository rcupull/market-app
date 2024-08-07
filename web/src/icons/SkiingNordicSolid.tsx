import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSkiingNordicSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.5 4C12.57 4 11 5.57 11 7.5s1.57 3.5 3.5 3.5S18 9.43 18 7.5 16.43 4 14.5 4zm0 2c.827 0 1.5.673 1.5 1.5S15.327 9 14.5 9 13 8.327 13 7.5 13.673 6 14.5 6zm-.814 5.992a1.993 1.993 0 00-2.127 1.475L10.06 18.74a2.002 2.002 0 00.753 2.096l3.206 2.342L14.78 27H9.955l1.03-1.412c.07-.131.131-.267.18-.4l.827-2.266-1.685-1.219-1.024 2.805a1.01 1.01 0 01-.058.129L7.502 27H3v2h21.486a4.688 4.688 0 004.455-3.21l.059-.173-1.896-.633-.057.172A2.698 2.698 0 0124.487 27H21V16h-4.244l-.785-2.336a2.018 2.018 0 00-1.348-1.424l-.537-.166a1.982 1.982 0 00-.4-.082zm-.196 1.992l.567.254.785 2.23a1.994 1.994 0 001.94 1.514H19V27h-2.18l-.834-4.182a1.998 1.998 0 00-.787-1.283l-3.207-2.28 1.498-5.27z'
    })
  );
}
export default SvgSkiingNordicSolid;
