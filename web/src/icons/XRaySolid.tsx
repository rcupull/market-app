import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgXRaySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm8 1v1h-3v2h3v1h-5v2h5v1h-4v2h4v2.563c-.523-.27-1.113-.563-1.5-.563a1.5 1.5 0 000 3c.379 0 1.672 1 2.5 1 .828 0 2.121-1 2.5-1a1.5 1.5 0 000-3c-.387 0-.977.293-1.5.563V8zm3 1v2h2V9zm0 3v2h4v-2zm0 3v2h3v-2z',
    })
  );
}
export default SvgXRaySolid;
