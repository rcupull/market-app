import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSwimmingPoolSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M12 4c-1.652 0-3 1.348-3 3v12.625l1-.719 1 .719V7c0-.55.45-1 1-1h1V4zm12 0c-1.652 0-3 1.348-3 3v1h-9v2h9v2h-9v2h9v2h-9v2h9v1.625l1-.719 1 .719V7c0-.55.45-1 1-1h1V4zM10 20.719l-.625.5S8.371 22 7.031 22c-1.34 0-2.406-.781-2.406-.781l-1.25 1.562S4.918 24 7.031 24c1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 2.114 0 3.594-1.219 3.594-1.219l-1.25-1.562S26.371 22 25.031 22c-1.34 0-2.406-.781-2.406-.781l-.625-.5-.625.5S20.371 22 19.031 22c-1.34 0-2.406-.781-2.406-.781l-.625-.5-.625.5S14.371 22 13.031 22c-1.34 0-2.406-.781-2.406-.781zm0 4l-.625.5S8.371 26 7.031 26c-1.34 0-2.406-.781-2.406-.781l-1.25 1.562S4.918 28 7.031 28c1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 1.461 0 2.39-.484 2.969-.844.582.356 1.559.844 3.031.844 2.114 0 3.594-1.219 3.594-1.219l-1.25-1.562S26.371 26 25.031 26c-1.34 0-2.406-.781-2.406-.781l-.625-.5-.625.5S20.371 26 19.031 26c-1.34 0-2.406-.781-2.406-.781l-.625-.5-.625.5S14.371 26 13.031 26c-1.34 0-2.406-.781-2.406-.781z',
    })
  );
}
export default SvgSwimmingPoolSolid;
