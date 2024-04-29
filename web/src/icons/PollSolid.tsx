import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPollSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm8 3v12h2V10h-2zm-5 4v8h2v-8h-2zm10 2v6h2v-6h-2z',
    }),
  );
}
export default SvgPollSolid;
