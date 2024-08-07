import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEyeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 8C7.664 8 1.25 15.344 1.25 15.344L.656 16l.594.656s5.848 6.668 13.625 7.282c.371.046.742.062 1.125.062s.754-.016 1.125-.063c7.777-.613 13.625-7.28 13.625-7.28l.594-.657-.594-.656S24.336 8 16 8zm0 2c2.203 0 4.234.602 6 1.406.637 1.055 1 2.27 1 3.594a6.995 6.995 0 01-6.219 6.969c-.02.004-.043-.004-.062 0-.239.011-.477.031-.719.031-.266 0-.523-.016-.781-.031A6.995 6.995 0 019 15c0-1.305.352-2.52.969-3.563h-.031C11.717 10.617 13.773 10 16 10zm0 2a3 3 0 10.002 6.002A3 3 0 0016 12zm-8.75.938A9.006 9.006 0 007 15c0 1.754.5 3.395 1.375 4.781A23.196 23.196 0 013.531 16a23.93 23.93 0 013.719-3.063zm17.5 0A23.93 23.93 0 0128.469 16a23.196 23.196 0 01-4.844 3.781A8.929 8.929 0 0025 15c0-.715-.094-1.398-.25-2.063z'
    })
  );
}
export default SvgEyeSolid;
