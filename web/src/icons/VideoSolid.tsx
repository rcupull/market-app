import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVideoSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M2 8v16h22v-3.375l6 3V8.375l-6 3V8zm2 2h18v12H4zm24 1.625v8.75l-4-2v-4.75z',
    })
  );
}
export default SvgVideoSolid;
