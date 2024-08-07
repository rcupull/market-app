import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFolderSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V15.437l1.719-1.718.281-.313V3zm2 2h14v8.406l.281.313L24 15.438V27H8zm16 0h2v7.563l-1 1-1-1z'
    })
  );
}
export default SvgFolderSolid;
