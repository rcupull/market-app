import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDirectionsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3a3 3 0 00-2.125.875l-.125.156-9.719 9.719-.156.125a3.023 3.023 0 000 4.25l10 10a3.023 3.023 0 004.25 0l10-10a3.023 3.023 0 000-4.25l-10-10A3 3 0 0016 3zm0 2c.254 0 .52.082.719.281l10 10a1.015 1.015 0 010 1.438l-10 10a1.015 1.015 0 01-1.438 0l-10-10a1.015 1.015 0 010-1.438l10-10c.2-.199.465-.281.719-.281zm1 6v3h-4a2 2 0 00-2 2v3h2v-3h4v3l4-4-4-4z'
    })
  );
}
export default SvgDirectionsSolid;
