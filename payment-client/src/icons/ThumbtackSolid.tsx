import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThumbtackSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M20.531 2.563l-.687.937-4.907 6.688c-2.628-.458-5.41.285-7.437 2.312l-.719.688 5.313 5.312L4 26.594V28h1.406l8.094-8.094 5.313 5.313.687-.719c2.027-2.027 2.77-4.809 2.313-7.438l6.687-4.906.938-.687zm.25 3.062l5.594 5.594-6.219 4.562-.562.406.187.657c.48 1.832-.043 3.742-1.187 5.343l-8.782-8.78c1.602-1.145 3.512-1.669 5.344-1.188l.656.187.407-.562z'
    })
  );
}
export default SvgThumbtackSolid;
