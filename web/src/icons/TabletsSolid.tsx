import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTabletsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M22 3c-3.86 0-7 3.141-7 7s3.14 7 7 7 7-3.141 7-7-3.14-7-7-7zm0 2c2.757 0 5 2.243 5 5 0 1.017-.31 1.961-.834 2.752l-6.918-6.918A4.964 4.964 0 0122 5zm-4.166 2.248l6.918 6.92A4.965 4.965 0 0122 15c-2.757 0-5-2.243-5-5 0-1.017.31-1.961.834-2.752zM10 14c-3.86 0-7 3.141-7 7s3.14 7 7 7 7-3.141 7-7-3.14-7-7-7zm0 2a5.008 5.008 0 014.898 4H5.102c.464-2.28 2.484-4 4.898-4zm-4.898 6h9.796A5.008 5.008 0 0110 26a5.008 5.008 0 01-4.898-4z'
    })
  );
}
export default SvgTabletsSolid;
