import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBatteryEmptySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M3 8v16h24v-5h2v-6h-2V8zm2 2h20v12H5z' }),
  );
}
export default SvgBatteryEmptySolid;
