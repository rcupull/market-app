import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEditSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M25 4.031c-.766 0-1.516.297-2.094.875L13 14.781l-.219.219-.062.313-.688 3.5-.312 1.468 1.469-.312 3.5-.688.312-.062.219-.219 9.875-9.906A2.968 2.968 0 0025 4.03zm0 1.938c.234 0 .465.12.688.343.445.446.445.93 0 1.375L16 17.376l-1.719.344.344-1.719 9.688-9.688c.222-.222.453-.343.687-.343zM4 8v20h20V14.812l-2 2V26H6V10h9.188l2-2z'
    })
  );
}
export default SvgEditSolid;
