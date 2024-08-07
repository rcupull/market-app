import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPlaneArrivalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.406 3.969L3.344 5.25 3 14.031l-.031.781.75.22 6.406 1.937-5.438 3.781-1.53 1.063 1.718.687 2.844 1.125.375.156.375-.156 10-4.156 6.406 1.937c1.688.508 3.492-.472 4-2.156.508-1.688-.473-3.492-2.156-4L21.03 13.5 17.25 7.25l-.219-.344-.375-.125L14 6.063l-1.469-.375.219 1.5.531 3.906-4.25-1.313-1.625-4.187-.187-.469-.469-.156-2.125-.625zm1.875 2.656l.438.125 1.593 4.188.157.468.468.125 18.188 5.625a1.19 1.19 0 01.813 1.5 1.19 1.19 0 01-1.5.813l-6.75-2.032-.344-.093-.313.125-9.937 4.156-.75-.313 5.625-3.875 1.719-1.187-2-.594-7.657-2.312zm9.625 1.781l.813.219 2.437 3.969-2.812-.844zM20.5 21a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3 26v2h26v-2z'
    })
  );
}
export default SvgPlaneArrivalSolid;
