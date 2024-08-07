import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSunSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 3v5h2V3zM7.5 6.094L6.094 7.5l3.531 3.563 1.438-1.438zm17 0l-3.563 3.531 1.438 1.438L25.906 7.5zM16 9c-3.855 0-7 3.145-7 7s3.145 7 7 7 7-3.145 7-7-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zM3 15v2h5v-2zm21 0v2h5v-2zM9.625 20.938L6.094 24.5 7.5 25.906l3.563-3.531zm12.75 0l-1.438 1.437 3.563 3.531 1.406-1.406zM15 24v5h2v-5z'
    })
  );
}
export default SvgSunSolid;
