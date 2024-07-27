import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDigg(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9.52 6.988v1.957h2.816s.355.012.355-.394l.004-1.961H9.88s-.36-.008-.36.398zm0 4.067V21.64h2.812s.36.007.36-.395l.003-10.59H9.883s-.363-.008-.363.399zM5.387 6.988v3.668H.359S0 10.648 0 11.055V21.64h8.203s.36.007.36-.399V6.59H5.745s-.36-.008-.36.398zm.004 11.899c0 .406-.36.394-.36.394H3.11v-5.875c0-.406.36-.394.36-.394H5.39zm8.394-7.832V21.64h5.387v1.414h-5.027s-.36-.012-.36.394v1.961h8.2s.363.008.363-.398V10.664l-8.203-.008s-.36-.008-.36.399zm3.11 2.351c0-.406.359-.394.359-.394h1.922v5.875c0 .406-.36.394-.36.394h-1.921zm6.902-2.75s-.36-.008-.36.399V21.64h5.387v1.414h-5.027s-.36-.012-.36.394v1.961h8.204s.355.008.355-.398L32 10.664zm5.031 8.23c0 .407-.36.395-.36.395h-1.921v-5.875c0-.406.36-.394.36-.394h1.921z',
    }),
  );
}
export default SvgDigg;
