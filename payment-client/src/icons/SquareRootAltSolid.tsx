import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSquareRootAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M19.313 6l-.25.656-6.157 16.063-3-6.157L9.625 16H6v2h2.375L12 25.438l.281.562h1.5l.25-.656L20.687 8H26V6z'
    })
  );
}
export default SvgSquareRootAltSolid;
