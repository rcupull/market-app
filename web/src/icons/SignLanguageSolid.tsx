import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSignLanguageSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M20.225 1.367l-1.618 1.176 8.375 11.527a1.994 1.994 0 01-.837 1.494l-2.805 1.96a1.992 1.992 0 01-2.742-.436l-5.8-7.69-1.597 1.204L19 18.293a3.989 3.989 0 005.484.87l2.805-1.96A4.001 4.001 0 0029 13.923V7h-2v3.69l-6.775-9.323zm-3.014.955l-1.617 1.176 5.246 7.22 1.617-1.175-5.246-7.22zm-1.84 2.573L13.752 6.07l4.627 6.367 1.617-1.175-4.625-6.367zm-2.79 10.29l-1.161 1.627L14.48 19H3v2h14.252c.465.377.748.941.748 1.545V26c0 1.103-.897 2-2 2H6v2h10c2.206 0 4-1.794 4-4v-3.455a4.01 4.01 0 00-1.676-3.256l-5.744-4.103zM2 22v2h9v-2H2zm1 3v2h8v-2H3z'
    })
  );
}
export default SvgSignLanguageSolid;
