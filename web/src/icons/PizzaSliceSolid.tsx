import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPizzaSliceSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12.375 3.813l-.313.843-8 21.907-.218.593 1 1 .593-.218 21.907-8 .843-.313-.218-.875s-1.41-5.629-5.25-9.469-9.469-5.25-9.469-5.25zm1.219 2.468c1.136.352 4.836 1.586 7.687 4.438 2.852 2.851 4.086 6.55 4.438 7.687l-1.532.563a10.464 10.464 0 00-.437-1.407c-.61-1.511-1.746-3.496-3.781-5.53-2.035-2.036-4.02-3.141-5.532-3.75-.539-.216-1-.36-1.406-.47zm-1.219 3.407c.336.09.766.218 1.313.437 1.289.52 3.046 1.484 4.874 3.313.536.535.977 1.05 1.375 1.562A2.004 2.004 0 0018 17c0 1.105.895 2 2 2 .738 0 1.371-.402 1.719-1 .043.102.117.215.156.313.227.562.348 1.007.438 1.343l-10 3.625A1.483 1.483 0 0011 22.5a1.5 1.5 0 00-1.469 1.813l-2.906 1.062 3.5-9.594A2 2 0 0011 16a2 2 0 00.5-3.938zM14 17.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z'
    })
  );
}
export default SvgPizzaSliceSolid;
