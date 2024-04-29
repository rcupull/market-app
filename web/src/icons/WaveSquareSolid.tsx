import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWaveSquareSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M8 6v9H2v2h8V8h5v18h9v-9h6v-2h-8v9h-5V6H8z' }),
  );
}
export default SvgWaveSquareSolid;
