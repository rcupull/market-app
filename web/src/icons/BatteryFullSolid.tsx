import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBatteryFullSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M3 8v16h24v-5h2v-6h-2V8zm2 2h20v12H5zm2 2v8h16v-8z' })
  );
}
export default SvgBatteryFullSolid;
