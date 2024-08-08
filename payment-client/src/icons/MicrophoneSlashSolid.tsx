import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMicrophoneSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.719 2.281L2.28 3.72l26 26 1.438-1.438L23.437 22C24.398 20.937 25 19.543 25 18v-4h-2v4c0 .992-.363 1.898-.969 2.594l-1.406-1.407c.238-.328.375-.75.375-1.187V6c0-1.102-.898-2-2-2h-6c-1.102 0-2 .898-2 2v3.563zM13 6h6v11.563l-6-6zm-6 8v4c0 3.309 2.691 6 6 6h2v2h-4v2h10v-2h-4v-2h2c.254 0 .504-.031.75-.063L17.812 22H13c-2.207 0-4-1.793-4-4v-4zm4 1.188V18c0 1.102.898 2 2 2h2.813l-2-2H13v-.813z'
    })
  );
}
export default SvgMicrophoneSlashSolid;
