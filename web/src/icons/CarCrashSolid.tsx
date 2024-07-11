import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCarCrashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9.5 6c-1.32 0-2.496.86-2.875 2.125L5.25 12.719l-1.938-.656-.624 1.874 1.968.657-.625 2.125A.972.972 0 004 17v8c0 .55.45 1 1 1h3l.656-2h5.25l9.938 1.531L24 26h3.031c.242 0 .477-.09.657-.25l.03-.031c.012-.012.024-.02.032-.032a.998.998 0 00.25-.625v-.093a.668.668 0 000-.125L27.156 19H29v-2h-2.375L24.5 12.656l.875-2.937a1.004 1.004 0 00-.344-1.094l-1.937-1.438a1.017 1.017 0 00-.5-.187L9.562 6H9.5zm0 2l12.625.969 1.125.844-.781 2.624a.999.999 0 00.062.75l1.5 3.063-6.125-2.125-.125-.063h-.125L7.22 13.095 8.53 8.719c.13-.43.524-.719.969-.719zm-2.875 7.063l10.781 1h.063l7.625 2.687.718 5.031L14.22 22a1.043 1.043 0 00-.156 0h-1.157l.438-1 4.312.625L20.25 22 19 20l-7-1-1.25 3H6v-4.813zM8.5 16a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12.375 2.75a1.808 1.808 0 103.406 1.219z',
    }),
  );
}
export default SvgCarCrashSolid;
