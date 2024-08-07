import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDraftingCompassSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 3v3.156c-1.719.446-3 1.992-3 3.844 0 1.047.426 2 1.094 2.719L9.75 20H6v2h2.813l-2.844 6.188 1.812.843L11.031 22H15v2h2v-2h3.969l3.218 7.031L26 28.22 23.156 22H26v-2h-3.75l-3.344-7.313C19.566 11.977 20 11.043 20 10c0-1.852-1.281-3.398-3-3.844V3zm1 5c1.117 0 2 .883 2 2 0 .582-.234 1.102-.625 1.469l-.031.031-1 .438L20.03 20H17v-2h-2v2h-3.063l3.688-8-1-.469.031-.031A1.976 1.976 0 0114 10c0-1.117.883-2 2-2z'
    })
  );
}
export default SvgDraftingCompassSolid;
