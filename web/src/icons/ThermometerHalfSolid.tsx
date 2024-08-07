import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThermometerHalfSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 4v11.5c-1.8 1.3-3 3.2-3 5.5 0 3.9 3.1 7 7 7s7-3.1 7-7c0-2.3-1.3-4.3-3-5.5V14h2v-2h-2v-2h2V8h-2V6h2V4H12zm2 2h4v10.4l.5.3c1.5.9 2.5 2.4 2.5 4.3 0 2.8-2.2 5-5 5s-5-2.2-5-5c0-1.9 1-3.4 2.5-4.3l.5-.3V6zm1 7v5.2c-1.2.4-2 1.5-2 2.8 0 1.7 1.3 3 3 3s3-1.3 3-3c0-1.3-.8-2.4-2-2.8V13h-2z'
    })
  );
}
export default SvgThermometerHalfSolid;
