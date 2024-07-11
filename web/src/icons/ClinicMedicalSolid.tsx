import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgClinicMedicalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 4.906L3.625 10.063l-.625.28V27h26V10.344l-.625-.281zm0 2.188l11 4.593V25H5V11.687zM15 13v3h-3v2h3v3h2v-3h3v-2h-3v-3z',
    }),
  );
}
export default SvgClinicMedicalSolid;
