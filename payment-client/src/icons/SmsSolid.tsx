import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSmsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M2 5v20h5v5.094l1.625-1.313L13.344 25H30V5zm2 2h24v16H12.656l-.281.219L9 25.906V23H4zm4 5v2h16v-2zm0 4v2h12v-2z'
    })
  );
}
export default SvgSmsSolid;
