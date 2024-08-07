import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileMedicalAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v11h1.367L8 12.42V5h10v6h6v16H8v-5.754l-.053-.053L6.756 20H6v9h20V9.594l-.281-.313-6-6L19.406 3H6zm14 3.438L22.563 9H20V6.437zm-9.031 3.949l-2.336 5.832L8.414 16H2v2h5.586l1.777 1.781 1.668-4.168 3 7 2.07-5.175.282.562h1.887a2 2 0 100-2h-.653l-1.719-3.438-1.93 4.825-3-7z'
    })
  );
}
export default SvgFileMedicalAltSolid;
