import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMapMarkedAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M22 3c-3.3 0-6 2.7-6 6 0 .992.383 2.004.875 3.125a35.124 35.124 0 001.75 3.406 62.171 62.171 0 002.563 4.031L22 20.75l.813-1.188s1.289-1.835 2.562-4.03a35.123 35.123 0 001.75-3.407C27.617 11.004 28 9.992 28 9c0-3.3-2.7-6-6-6zM11.969 4.938L4 8.344V27.53l8.031-3.468 8 3L28 23.655v-8.718a49.143 49.143 0 01-2 3.437v3.969l-5 2.125v-1.625l-1.469-2.125c-.156-.227-.34-.496-.531-.782v4.625l-6-2.25V7.438l1.094.407a7.853 7.853 0 01.531-1.938zM22 5c2.219 0 4 1.781 4 4 0 .387-.242 1.3-.688 2.313-.445 1.011-1.074 2.16-1.687 3.218-.816 1.406-1.168 1.906-1.625 2.594-.457-.688-.809-1.188-1.625-2.594-.613-1.058-1.242-2.207-1.688-3.219C18.242 10.302 18 9.387 18 9c0-2.219 1.781-4 4-4zM11 7.5v14.844l-5 2.125V9.656zm11 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z',
    }),
  );
}
export default SvgMapMarkedAltSolid;
