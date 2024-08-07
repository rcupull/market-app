import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWeightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 6v20h24V6zm2 2h20v16H6zm10 2c-4.332 0-7.563 2.156-7.563 2.156l-.78.531.5.813 3 5 .28.5h9.126l.28-.5 3-5 .5-.813-.78-.53S20.331 10 16 10zm0 2c2.824 0 4.688.906 5.594 1.406L19.469 17h-1.844l1.281-2.563-1.812-.874L15.375 17h-2.844l-2.125-3.594C11.312 12.906 13.176 12 16 12z'
    })
  );
}
export default SvgWeightSolid;
