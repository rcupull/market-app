import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgExclamationTriangleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.219l-.875 1.5-12 20.781-.844 1.5H29.72l-.844-1.5-12-20.781zm0 4L26.25 25H5.75zM15 14v6h2v-6zm0 7v2h2v-2z'
    })
  );
}
export default SvgExclamationTriangleSolid;
