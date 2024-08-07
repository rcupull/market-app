import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLayerGroupSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5.938l-.375.125-10 4L3.312 11l2.313.938L9.531 13.5l-3.906 1.563L3.312 16l2.313.938L9.531 18.5l-3.906 1.563L3.312 21l2.313.938 10 4 .375.125.375-.125 10-4L28.688 21l-2.313-.938-3.906-1.562 3.906-1.563L28.688 16l-2.313-.938-3.906-1.562 3.906-1.563L28.688 11l-2.313-.938-10-4zm0 2.156L23.281 11 16 13.906 8.719 11zm-3.75 6.5l3.375 1.344.375.124.375-.125 3.375-1.343L23.281 16 16 18.906 8.719 16zm0 5l3.375 1.343.375.125.375-.125 3.375-1.343L23.281 21 16 23.906 8.719 21z'
    })
  );
}
export default SvgLayerGroupSolid;
