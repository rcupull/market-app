import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBriefcaseSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3c-1.863 0-3.398 1.277-3.844 3H3v20h26V6h-9.156c-.446-1.723-1.98-3-3.844-3zm0 2c.809 0 1.43.387 1.75 1h-3.5c.32-.613.941-1 1.75-1zM5 8h22v9H5zm11 6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM5 19h22v5H5z',
    })
  );
}
export default SvgBriefcaseSolid;
