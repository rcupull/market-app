import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMarkerSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M23.625 3.063l-.719.624L7.563 17l-.5.469.25.656s1.125 3-1.032 5.156v.032l-.031.03-.156.188-.125.125L2 27.531 7.375 29l2.063-2.063.218-.187.031-.031h.032c2.156-2.157 5.156-1.032 5.156-1.032l.656.25.469-.5 13.313-15.343.625-.719zm-.125 2.75L27.188 9.5l-8.75 10.063-5-5zM11.937 15.874l5.188 5.188-1.938 2.25-5.5-5.5zM9.563 20.5l2.937 2.938c-1.242.046-2.746.437-4.156 1.812-.02.02-.043.012-.063.031l-.25.219-.531-.531.219-.25.031-.063c1.375-1.41 1.766-2.914 1.813-4.156z'
    })
  );
}
export default SvgMarkerSolid;
