import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDatabaseSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M6 4v24h20V4zm2 2h16v5H8zm0 7h16v6H8zm0 8h16v5H8z' }),
  );
}
export default SvgDatabaseSolid;
