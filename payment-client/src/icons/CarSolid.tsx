import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCarSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9.5 6c-1.32 0-2.496.86-2.875 2.125L5.25 12.719l-1.938-.656-.624 1.874 1.968.657-.625 2.125A.972.972 0 004 17v8c0 .55.45 1 1 1h3l.344-1h15.312L24 26h3c.55 0 1-.45 1-1v-.844c.004-.05.004-.105 0-.156v-7a.972.972 0 00-.031-.281l-.625-2.125 1.968-.656-.625-1.876-1.937.657-1.375-4.594A2.997 2.997 0 0022.5 6zm0 2h13c.445 0 .84.293.969.719L24.75 13H7.25l1.281-4.281c.13-.43.524-.719.969-.719zm-2.844 7h18.688L26 17.188V23H6v-5.813zM8.5 16a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm15 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 19l-1.25 3h2.156l.438-1h5.312l.438 1h2.156L20 19z'
    })
  );
}
export default SvgCarSolid;
