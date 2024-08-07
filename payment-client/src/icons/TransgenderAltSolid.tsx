import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTransgenderAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 4v7h2V7.406L9.063 10.5 7.28 12.281 8.72 13.72l1.781-1.781 1.313 1.312A4.924 4.924 0 0011 16c0 2.406 1.727 4.438 4 4.906V23h-3v2h3v3h2v-3h3v-2h-3v-2.094c2.273-.468 4-2.5 4-4.906a4.924 4.924 0 00-.813-2.75L26 7.406V11h2V4h-7v2h3.594l-5.844 5.813A4.924 4.924 0 0016 11a4.924 4.924 0 00-2.75.813L11.937 10.5l1.782-1.781L12.28 7.28 10.5 9.063 7.406 6H11V4zm12 9c1.668 0 3 1.332 3 3s-1.332 3-3 3-3-1.332-3-3 1.332-3 3-3z'
    })
  );
}
export default SvgTransgenderAltSolid;
