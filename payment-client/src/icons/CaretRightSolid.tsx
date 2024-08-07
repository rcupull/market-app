import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCaretRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 4.594v22.812l1.719-1.687 9-9 .687-.719-.687-.719-9-9zm2 4.843L20.563 16 14 22.563z'
    })
  );
}
export default SvgCaretRightSolid;
