import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPrescriptionSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v16h2v-6h4.994l4.776 8.828L13.107 29h2.385l3.9-6h.215l3.9 6h2.386l-4.649-7.148L25.24 15h-2.314l-3.412 5.85-4.483-8.29A5.001 5.001 0 0018 8c0-2.757-2.243-5-5-5H6zm2 2h5c1.654 0 3 1.346 3 3s-1.346 3-3 3H8V5z'
    })
  );
}
export default SvgPrescriptionSolid;
