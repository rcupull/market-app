import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHandsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3 5v11.406l.281.313L9 22.437V28h6v-6c.004-.055.146-3.155-2.438-4.813-.007-.004.008-.027 0-.03-.007-.005-.023.003-.03 0-1.185-.774-2.407-1.406-3.25-2.063C8.43 14.434 8 13.887 8 13H6c0 1.617.945 2.844 2.031 3.688 1.086.844 2.348 1.465 3.406 2.156h.032C13.07 19.848 13 21.969 13 21.969V26h-2v-4.406l-.281-.313L5 15.563V5H3zm24 0v10.563l-5.719 5.718-.281.313V26h-2v-4.063s-.07-2.09 1.531-3.093h.032c1.055-.691 2.32-1.314 3.406-2.157C25.055 15.845 26 14.617 26 13h-2c0 .887-.43 1.434-1.281 2.094-.844.656-2.066 1.288-3.25 2.062-.008.004-.024-.004-.032 0v.032C16.875 18.828 16.997 21.895 17 22v6h6v-5.563l5.719-5.718.281-.313V5h-2z',
    }),
  );
}
export default SvgHandsSolid;
