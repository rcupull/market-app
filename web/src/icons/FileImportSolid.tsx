import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileImportSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 4v24h20v-9h-2v7H8V6h16v7h2V4zm11.5 7l-4.313 4.281L12.5 16l.688.719L17.5 21l1.406-1.406L16.313 17H28v-2H16.312l2.594-2.594z'
    })
  );
}
export default SvgFileImportSolid;
