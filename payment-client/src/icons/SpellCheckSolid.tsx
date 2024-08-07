import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSpellCheckSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7.332 5L3 18h2.107l1-3h4.561l1 3h2.107L9.441 5H7.332zM15 5v13h6c2.206 0 4-1.794 4-4a4.001 4.001 0 00-2.51-3.705c.318-.527.51-1.136.51-1.795C23 6.57 21.43 5 19.5 5H15zm2 2h2.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5H17V7zM8.389 8.162L10.002 13H6.775L8.39 8.162zM17 12h4c1.103 0 2 .897 2 2s-.897 2-2 2h-4v-4zm10.809 5.777l-8.692 8.336-3.924-3.777-1.386 1.44 5.306 5.11 10.078-9.663-1.382-1.446z'
    })
  );
}
export default SvgSpellCheckSolid;
