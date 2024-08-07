import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRecycleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.969a3.266 3.266 0 00-2.75 1.5l-2.813 4.625 1.72 1.031 2.812-4.594c.539-.804 1.562-.824 2.094 0l3.125 5-1.5.875L23.313 15V9.687l-1.438.844L18.75 5.47a3.266 3.266 0 00-2.75-1.5zm-5.594 8.125l-4.5 2.594 1.25.75-2.562 4.218-.032-.031c-.011.02.012.043 0 .063C3.09 21.918 4.79 25 7.5 25H13v-2H7.5c-1.266 0-1.945-1.25-1.281-2.219l.031-.031v-.031l2.625-4.25 1.531.937zm14.656 3.562l-1.718 1.063 2.5 4c.64 1.09-.086 2.281-1.25 2.281H19v-2l-4.906 3L19 27v-2h5.594c2.636 0 4.328-3 2.968-5.313v-.03z'
    })
  );
}
export default SvgRecycleSolid;
