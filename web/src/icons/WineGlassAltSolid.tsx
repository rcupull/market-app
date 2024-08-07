import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWineGlassAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.188 5l-.157.781S7 10.488 7 13c0 4.617 3.516 8.43 8 8.938V26h-5v2h12v-2h-5v-4.063c4.484-.507 8-4.32 8-8.937 0-2.516-1.031-7.219-1.031-7.219L23.812 5zm1.656 2h12.312c.094.488.332 1.719.532 3H11v2h11.938c.03.348.062.723.062 1 0 3.879-3.121 7-7 7s-7-3.121-7-7c0-1.688.668-5.094.844-6z'
    })
  );
}
export default SvgWineGlassAltSolid;
