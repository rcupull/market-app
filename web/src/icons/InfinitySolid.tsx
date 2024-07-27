import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgInfinitySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9 9c-3.855 0-7 3.145-7 7 0 3.86 3.14 7 7 7 2.93 0 4.719-1.61 6.094-3.594-.41-.66-.754-1.312-1.094-1.937C12.773 19.496 11.398 21 9 21c-2.758 0-5-2.242-5-5 0-2.773 2.227-5 5-5 1.617 0 2.645.578 3.594 1.563.949.984 1.75 2.406 2.562 3.906.813 1.5 1.637 3.078 2.844 4.343C19.207 22.078 20.871 23 23 23c3.855 0 7-3.145 7-7 0-3.86-3.14-7-7-7-2.914 0-4.715 1.559-6.094 3.5.41.648.785 1.285 1.125 1.906C19.25 12.437 20.61 11 23 11c2.758 0 5 2.242 5 5 0 2.773-2.227 5-5 5-1.59 0-2.59-.578-3.531-1.563-.942-.984-1.746-2.406-2.563-3.906-.816-1.5-1.656-3.078-2.875-4.344C12.812 9.922 11.148 9 9 9z',
    }),
  );
}
export default SvgInfinitySolid;
