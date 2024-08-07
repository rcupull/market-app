import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChalkboardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 7v16H3v2h26v-2h-2V7zm2 2h18v14H7zm14.281 3.281L17 16.562l-3.281-3.28-.719-.688-.719.687-3 3 1.438 1.438L13 15.437l3.281 3.282.719.687.719-.687 5-5zM20 20l-1 1 1 1h4v-2z'
    })
  );
}
export default SvgChalkboardSolid;
