import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStepForwardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M22 5v10.5l-.438-.313-13-9L7 5.095v21.812l1.563-1.093 13-9L22 16.5V27h2V5zM9 8.906L19.25 16 9 23.094z'
    })
  );
}
export default SvgStepForwardSolid;
