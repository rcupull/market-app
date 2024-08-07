import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFeatherSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M21.5 4c-1.802 0-3.48.725-4.703 2.021l-8.16 8.155A8.936 8.936 0 006 20.539V22l2.027-2.027a6.945 6.945 0 012.024-4.383l8.18-8.176A4.456 4.456 0 0121.5 6c2.481 0 4.5 2.019 4.5 4.5 0 1.246-.502 2.406-1.436 3.29l-2.03 2.032L19 17h2.355l-3.818 3.82L14 22h2.354a6.95 6.95 0 01-4.893 2H9.414l9.293-9.293-1.414-1.414L4 26.586 5.414 28l2-2h4.047a8.934 8.934 0 006.363-2.637l8.133-8.14A6.435 6.435 0 0028 10.5C28 6.916 25.084 4 21.5 4z'
    })
  );
}
export default SvgFeatherSolid;
