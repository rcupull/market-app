import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBicycleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M19 6v1.438l.094.187L20.125 10h-8.688l-.312.438-2.719 3.843A6.414 6.414 0 006.5 14 6.508 6.508 0 000 20.5C0 24.086 2.914 27 6.5 27c3.414 0 6.207-2.652 6.469-6h3.437l.313-.438 4.875-7.187.656 1.5A6.517 6.517 0 0019 20.5c0 3.57 2.93 6.5 6.5 6.5s6.5-2.93 6.5-6.5-2.93-6.5-6.5-6.5c-.48 0-.953.055-1.406.156L21.406 8H24.5c.285 0 .5.215.5.5 0 .285-.215.5-.5.5v2c1.367 0 2.5-1.133 2.5-2.5S25.867 6 24.5 6zM8 7v2h6l-1-2zm5.469 5h6.656l-4.031 5.938zm-1.75 1l2.625 6H6v2h4.938c-.254 2.242-2.13 4-4.438 4C4.02 25 2 22.98 2 20.5S4.02 16 6.5 16a4.52 4.52 0 013.75 2h2.25a6.5 6.5 0 00-2.281-2.844zM25.5 16c2.48 0 4.5 2.02 4.5 4.5S27.98 25 25.5 25 21 22.98 21 20.5c0-1.574.832-2.945 2.063-3.75l2.03 4.656 1.813-.812-1.968-4.532c.187-.023.37-.062.562-.062z',
    }),
  );
}
export default SvgBicycleSolid;
