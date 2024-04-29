import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVideoSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3.719 2.281L2.28 3.72l26 26 1.438-1.438L24 22.563v-1.938l6 3V8.375l-6 3V8H9.437zM2 8v16h18l-2-2H4V10h2L4 8zm9.438 2H22v10.563zM28 11.625v8.75l-4-2v-4.75z',
    }),
  );
}
export default SvgVideoSlashSolid;
