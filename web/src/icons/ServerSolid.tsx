import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgServerSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 6v20h26V6zm2 2h22v4H5zm2 1v2h8V9zm17 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM5 14h22v4H5zm2 1v2h8v-2zm17 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM5 20h22v4H5zm2 1v2h8v-2zm17 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'
    })
  );
}
export default SvgServerSolid;
