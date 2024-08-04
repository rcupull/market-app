import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgParachuteBoxSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M28 16c0-6.617-5.383-12-12-12S4 9.383 4 16v.453l8 7V28h8v-4.547l8-7zM16 6.363c.867.942 2.422 3.172 2.871 7.293C18.148 13.281 17.207 13 16 13s-2.148.281-2.871.656c.45-4.125 2.008-6.355 2.871-7.293zm-4.914 10.035L13.484 22h-.109l-7.04-6.16C6.72 15.45 7.392 15 8.5 15c1.902 0 2.559 1.352 2.586 1.398zM15.66 22l-2.52-5.875C13.524 15.691 14.38 15 16 15c1.625 0 2.484.695 2.86 1.121L16.34 22zm2.856 0l2.398-5.602c.012-.015.64-1.398 2.586-1.398 1.102 0 1.773.453 2.16.844L18.625 22zm7.144-8.555C25.078 13.18 24.367 13 23.5 13c-1.11 0-1.965.293-2.621.684-.344-3.477-1.41-5.86-2.402-7.364 3.5.899 6.261 3.637 7.183 7.125zm-12.14-7.12c-.989 1.5-2.055 3.882-2.399 7.359C10.465 13.293 9.61 13 8.5 13c-.867 0-1.578.18-2.16.445a10.013 10.013 0 017.18-7.12zM18 26h-4v-2h4z'
    })
  );
}
export default SvgParachuteBoxSolid;
