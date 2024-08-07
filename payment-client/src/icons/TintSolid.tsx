import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTintSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.438l-.781.937s-2 2.41-4.031 5.406c-1.016 1.5-2.063 3.137-2.844 4.719C7.563 16.082 7 17.598 7 19c0 4.945 4.055 9 9 9s9-4.055 9-9c0-1.402-.563-2.918-1.344-4.5-.781-1.582-1.828-3.219-2.843-4.719-2.032-2.996-4.032-5.406-4.032-5.406zm0 3.218c.559.692 1.605 1.918 3.188 4.25.984 1.45 1.937 3.047 2.656 4.5C22.562 16.86 23 18.203 23 19c0 3.855-3.145 7-7 7s-7-3.145-7-7c0-.797.438-2.14 1.156-3.594.719-1.453 1.672-3.05 2.656-4.5 1.583-2.332 2.63-3.558 3.188-4.25zM11 19c0 2.746 2.254 5 5 5v-2a3 3 0 01-3-3z'
    })
  );
}
export default SvgTintSolid;
