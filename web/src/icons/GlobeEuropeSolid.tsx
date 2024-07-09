import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGlobeEuropeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c2.103 0 4.063.605 5.736 1.633l-.236.566 1.176 1.176-1.102 1.1L20 8h-2l-2 2.5 1 2.2 1-.7v-1h1l1.1.9L19 13l-4 2h-1v2h1l2-1 1 1h2v-1l.8-1.2L23 14v2h-2v1h2l2 3 1-1v-1h-1v-1h1l.96-.207A10.914 10.914 0 0125 22.305V22h-1.1l-2.4-4-2.5 1-3-1-3 1-1 3 1 2h2l1-1 1 1v2.95c-.33.03-.662.05-1 .05-6.065 0-11-4.935-11-11 0-.927.129-1.823.346-2.684L5.9 13H7V9.695c.167-.237.337-.472.521-.695h.899l.437-1.35a11.02 11.02 0 012.053-1.392L10 9h2l2-2V6h-1l-1 1V5.764A10.927 10.927 0 0116 5zm-2 6v2h1v-2h-1z',
    }),
  );
}
export default SvgGlobeEuropeSolid;
