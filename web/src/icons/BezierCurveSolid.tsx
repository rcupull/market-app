import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBezierCurveSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M12 6v3H5.812C5.396 7.844 4.293 7 3 7c-1.645 0-3 1.355-3 3s1.355 3 3 3c1.293 0 2.395-.844 2.813-2h2.312c-.41.39-.766.816-1.094 1.281-1.156 1.637-1.836 3.656-2 5.719H2v8h8v-8H7.062c.165-1.672.711-3.313 1.594-4.563.86-1.218 1.965-2.07 3.344-2.343V14h8v-2.906c1.379.273 2.484 1.125 3.344 2.344.883 1.25 1.43 2.89 1.593 4.562H22v8h8v-8h-3.031c-.164-2.063-.844-4.082-2-5.719A8.575 8.575 0 0023.875 11h2.313c.417 1.156 1.519 2 2.812 2 1.645 0 3-1.355 3-3s-1.355-3-3-3c-1.293 0-2.395.844-2.813 2H20V6zm2 2h4v4h-4zM3 9c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm26 0c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zM4 20h4v4H4zm20 0h4v4h-4z',
    })
  );
}
export default SvgBezierCurveSolid;
