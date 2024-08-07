import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBlenderPhoneSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6.578 5a.978.978 0 00-.816.479A12.891 12.891 0 004 12c0 2.378.644 4.607 1.76 6.521a.995.995 0 001.146.436l1.944-.58a.518.518 0 00.123-.525l-.8-2.424a.51.51 0 00-.482-.352h-.826a.513.513 0 01-.496-.379A10.725 10.725 0 016.03 12c0-.929.116-1.835.34-2.697a.512.512 0 01.496-.38h.828a.51.51 0 00.483-.349l.799-2.426a.519.519 0 00-.123-.525l-1.944-.58A1.022 1.022 0 006.578 5zm3.418 0l1.881 16.012A2.998 2.998 0 009 24v3h17v-3c0-1.568-1.214-2.844-2.748-2.975L26.957 5H9.997zm2.25 2h12.195l-.462 2H19v2h4.518l-.463 2H19v2h3.592l-.463 2H19v2h2.668l-.463 2h-7.314L12.246 7zM12 23h11c.551 0 1 .449 1 1v1H11v-1c0-.551.449-1 1-1z'
    })
  );
}
export default SvgBlenderPhoneSolid;
