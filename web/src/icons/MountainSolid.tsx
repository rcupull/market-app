import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMountainSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17.012 3.021l-.912 1.66-6.522 11.856-1.916-1.916-.66 1.098-5.86 9.767L.235 27h31.284l-.598-1.395-3-7-.582-1.357-2.068 2.068-7.403-14.605-.855-1.69zm-.073 4.282l3.04 5.996-.774.664-2.28-1.953-2.279 1.953-.93-.799 3.223-5.861zm-.013 7.34l2.28 1.953 1.702-1.46 3.2 6.315.622 1.233 1.932-1.932L28.482 25H3.766c1.43-2.385 2.862-4.77 4.293-7.154l1.988 1.988.642-1.166c.681-1.238 1.363-2.475 2.043-3.713l1.914 1.64 2.28-1.952z'
    })
  );
}
export default SvgMountainSolid;
