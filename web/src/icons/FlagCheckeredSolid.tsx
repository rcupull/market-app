import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFlagCheckeredSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 4v24h2v-8h20V4zm2 2h3v3h3V6h3v3h3V6h3v3h3v3h-3v3h3v3h-3v-3h-3v3h-3v-3h-3v3h-3v-3H7v-3h3V9H7zm3 6v3h3v-3zm3 0h3V9h-3zm3 0v3h3v-3zm3 0h3V9h-3z',
    })
  );
}
export default SvgFlagCheckeredSolid;
