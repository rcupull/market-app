import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWarehouseSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4.906L3.625 10.063l-.625.28V27h26V10.344l-.625-.281zm0 2.188l11 4.593V25h-2V14H7v11H5V11.687zM9 16h14v9H9z'
    })
  );
}
export default SvgWarehouseSolid;
