import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGrinWinkSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-4.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.5 1v2h5v-2zm2.969 4.031c0 1.684-.676 2.852-1.657 3.688C18.332 21.555 17.035 22 16 22c-2.121 0-3.563-.86-4.688-1.969L9.906 21.47C11.301 22.839 13.32 24 16 24c1.555 0 3.262-.586 4.625-1.75 1.363-1.164 2.344-2.96 2.344-5.219z'
    })
  );
}
export default SvgGrinWinkSolid;
