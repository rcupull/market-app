import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMagento(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.227L5 10.174V22.44l3 1.713V11.826l8-5.053 8 5.053V24.15l3-1.712V10.174L16 3.227zm-2 8.351l-3 1.887v12.404l5 2.86 5-2.86V13.484L18 11.6v12.53l-2 1.141-2-1.14V11.578z'
    })
  );
}
export default SvgMagento;
