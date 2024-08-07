import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHospitalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 3v2h-2v2h2v2h2V7h2V5h-2V3zM6 5v23h9v-3h2v3h9V5h-5v2h3v19h-5v-3h-6v3H8V7h3V5zm5 6v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z'
    })
  );
}
export default SvgHospitalSolid;
