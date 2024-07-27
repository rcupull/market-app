import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLess(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3.256 9.15c-1.42 0-2.05.55-2.05 2.26 0 1.13.16 1.76.16 2.73 0 .55-.339 1.13-1.364 1.18v1.366c1.025.025 1.363.606 1.363 1.156 0 .97-.16 1.55-.16 2.68 0 1.71.63 2.26 2.025 2.26h1.026V21.57H3.94c-.655 0-.865-.264-.865-1.129s.08-1.606.08-2.576c0-1.21-.394-1.678-1.18-1.863v-.08c.79-.185 1.18-.655 1.18-1.865 0-.945-.08-1.712-.08-2.577s.185-1.103.865-1.103h.705v7.541c0 1.605.55 2.654 2.155 2.654.5 0 .894-.08 1.18-.185l-.264-1.71c-.155.042-.23.042-.31.042-.186 0-.42-.162-.42-.657V9.15H3.255zm24.488.006v1.211h.317c.71 0 .865.236.865 1.106 0 .815-.08 1.629-.08 2.574 0 1.21.394 1.68 1.18 1.865v.08c-.79.185-1.18.655-1.18 1.865 0 .945.08 1.71.08 2.575 0 .895-.185 1.13-.865 1.13v.026h-.317v1.26h1.026c1.39 0 2.025-.55 2.025-2.26 0-1.13-.16-1.71-.16-2.73 0-.55.34-1.13 1.365-1.18v-1.366c-1.025-.034-1.365-.616-1.365-1.166 0-1.025.16-1.628.16-2.728 0-1.71-.63-2.262-2.025-2.262h-1.026zm-16.502 3.15c-1.92 0-3.757 1.607-3.707 4.128 0 2.6 1.711 4.125 3.967 4.125.945 0 1.995-.34 2.81-.895l-.79-1.39c-.58.34-1.13.5-1.71.5-1.05 0-1.866-.5-2.076-1.71h4.762c.025-.185.08-.55.08-.97.03-2.132-1.13-3.787-3.336-3.787zm7.067.026c-1.785 0-2.997 1.026-2.997 2.47 0 1.286 1.132 1.944 2.077 2.31.815.314 1.603.58 1.603 1.105 0 .395-.313.654-1.023.654-.655 0-1.316-.264-2.026-.814l-1.025 1.525c.79.655 1.994 1.105 2.994 1.105 2.1 0 3.233-1.105 3.233-2.55.004-1.444-1.128-2.05-2.153-2.39-.815-.316-1.549-.5-1.549-1.024 0-.395.315-.631.895-.631.58 0 1.105.234 1.68.654l1.05-1.389c-.655-.5-1.55-1.025-2.76-1.025zm6.384 0c-1.785 0-2.994 1.026-2.994 2.47 0 1.286 1.13 1.944 2.074 2.31.815.314 1.606.58 1.606 1.105 0 .395-.315.654-1.025.654-.655 0-1.316-.264-2.026-.814l-1.049 1.525c.79.655 1.994 1.105 2.994 1.105 2.1 0 3.233-1.105 3.233-2.55 0-1.445-1.127-2.05-2.152-2.39-.79-.316-1.526-.5-1.526-1.024 0-.395.317-.631.897-.631.58 0 1.104.234 1.68.654l1.048-1.389c-.655-.5-1.55-1.025-2.76-1.025zm-13.425 1.734c.945 0 1.314.656 1.314 1.551h-2.84c.16-1.05.79-1.55 1.526-1.55z',
    }),
  );
}
export default SvgLess;
