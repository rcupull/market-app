import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHouzz(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 2.281L8 6.844V16l8-4.563zm0 9.156L24 16V6.844zM24 16l-8 4.563v9.156l8-4.563zm-8 4.563L8 16v9.156z'
    })
  );
}
export default SvgHouzz;
