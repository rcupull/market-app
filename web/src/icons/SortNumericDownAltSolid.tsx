import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSortNumericDownAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M8.5 5A3.514 3.514 0 005 8.5V9h2v-.5C7 7.625 7.625 7 8.5 7h1c.875 0 1.5.625 1.5 1.5 0 .457-.352.98-.938 1.344-1.234.758-2.316 1.242-3.218 1.75-.453.254-.867.496-1.219.875C5.273 12.848 5 13.418 5 14v1h8v-2H8.437c.735-.379 1.583-.758 2.688-1.438C12.141 10.927 13 9.845 13 8.5 13 6.578 11.422 5 9.5 5zM22 5v18.688l-2.594-2.594L18 22.5l4.281 4.313.719.687.719-.688L28 22.5l-1.406-1.406L24 23.687V5zM8.594 17l-.156.781s-.165.574-.563 1.157C7.477 19.52 6.98 20 6 20v2c1.375 0 2.32-.676 3-1.406V27h2V17z',
    }),
  );
}
export default SvgSortNumericDownAltSolid;
