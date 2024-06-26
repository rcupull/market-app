import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRetweetSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 7l-5 5h4v13h17l-2-2H6V12h4zm4 0l2 2h13v11h-4l5 5 5-5h-4V7z' })
  );
}
export default SvgRetweetSolid;
