import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSyringeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M23.219 3.781L21.78 5.22l.375.375-2.281 2.281 1.406 1.438L23.563 7 25 8.438l-2.313 2.28 1.438 1.407 2.281-2.281.375.375L28.22 8.78zm-5.5 3.5L16.28 8.72l.657.656L7 19.344l-.344.343.063.47.343 3.187.032.343.093.063L3.938 27h2.844l2.032-2.031 3.03.312.47.063.343-.344 9.969-9.938.656.657 1.438-1.438zm.656 3.532l2.813 2.812-9.594 9.625-2.375-.281-.188-.188-.281-2.375z'
    })
  );
}
export default SvgSyringeSolid;
