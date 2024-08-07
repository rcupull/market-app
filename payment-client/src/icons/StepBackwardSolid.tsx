import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStepBackwardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8 5v22h2V16.5l.438.313 13 9L25 26.905V5.094l-1.563 1.093-13 9L10 15.5V5zm15 3.906v14.188L12.75 16z'
    })
  );
}
export default SvgStepBackwardSolid;
