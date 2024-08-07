import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPrescriptionBottleAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9.928 3c-.953 0-1.81.53-2.237 1.383L7.383 5H7c-1.103 0-2 .897-2 2v4h1v16c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V11h1V7c0-1.103-.897-2-2-2h-.383l-.308-.617A2.486 2.486 0 0022.072 3H9.928zm0 2h12.144c.191 0 .363.105.448.275L23.383 7H25v2H7V7h1.617l.863-1.725A.497.497 0 019.928 5zM8 11h16v16H8V11zm7 3v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z'
    })
  );
}
export default SvgPrescriptionBottleAltSolid;
