import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRestroomSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 4C6.8 4 5 5.8 5 8c0 1.113.477 2.117 1.219 2.844A5.041 5.041 0 004 15v5.625l2 1V28h6v-6.375l2-1V15a5.041 5.041 0 00-2.219-4.156C12.523 10.117 13 9.114 13 8c0-2.2-1.8-4-4-4zm13 0c-2.2 0-4 1.8-4 4 0 1.152.523 2.176 1.313 2.906a4.617 4.617 0 00-1.782 2.906v.032l-1.5 7.969-.25 1.187H19v5h6v-5h3.219l-.25-1.188-1.5-7.968v-.031a4.617 4.617 0 00-1.782-2.907C25.477 10.176 26 9.152 26 8c0-2.2-1.8-4-4-4zM9 6c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm13 0c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zM9 12a3 3 0 013 3v4.375l-2 1V26H8v-5.625l-2-1V15a3 3 0 013-3zm13 0c1.23 0 2.277.816 2.5 2.156v.031h.031L25.813 21H23v5h-2v-5h-2.813l1.282-6.813h.031v-.03C19.723 12.816 20.77 12 22 12z'
    })
  );
}
export default SvgRestroomSolid;
