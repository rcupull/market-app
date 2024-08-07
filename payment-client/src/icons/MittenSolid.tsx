import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMittenSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M19 3c-4.395 0-8 3.605-8 8v2.625c-1.723-1.008-3.96-.668-5.188.969-1.32 1.758-.976 4.277.782 5.594v.03h.031L12 24.157V29h14v-5.281c.02-.04.04-.074.063-.125.113-.227.234-.547.375-.969.28-.84.562-2.055.562-3.625v-8c0-4.395-3.605-8-8-8zm0 2c3.305 0 6 2.695 6 6v8c0 1.344-.219 2.344-.438 3-.109.328-.238.566-.312.719-.04.074-.043.125-.063.156-.007.016-.027.027-.03.031l.155.094H13.845l-.25-.188-5.781-4.218a1.964 1.964 0 01-.407-2.782c.672-.894 1.89-1.074 2.782-.406h.03l1.22.844L13 17.344V11c0-3.305 2.695-6 6-6zm-5 20h10v2H14z'
    })
  );
}
export default SvgMittenSolid;
