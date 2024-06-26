import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMagicSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M20.875 2.563l-.688.75-1.687 1.78h-3.594v3.5l-1.719 1.813-.687.719 2.188 2.188L3.03 25l-.719.719.72.687 3.28 3.282.688-.72 11.688-11.655 2.187 2.187.719-.688 1.812-1.718h3.5V13.5l1.782-1.688.75-.687-2.532-2.531v-3.5h-3.5zm.031 2.874l1.375 1.375.313.282h2.312v2.312l.282.313 1.375 1.375-1.344 1.281-.313.281v2.438h-2.312l-.282.281-1.406 1.344-.812-.813 4.531-4.531-3.969-3.969-.718.688-3.813 3.844-.844-.844 1.344-1.406.281-.282V7.094h2.438l.281-.313zm-.25 4.782l1.125 1.156-15.468 15.5-1.157-1.156zM19 21v1h-1v2h1v1h2v-1h1v-2h-1v-1zm6 2v2h-2v2h2v2h2v-2h2v-2h-2v-2z',
    })
  );
}
export default SvgMagicSolid;
