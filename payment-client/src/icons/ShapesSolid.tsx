import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgShapesSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M22.357 3.863L16.19 15h12.336L22.357 3.863zm0 4.127L25.131 13h-5.547l2.773-5.01zM9 16c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm8 1v11h11V17H17zm-8 1c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm10 1h7v7h-7v-7z'
    })
  );
}
export default SvgShapesSolid;
