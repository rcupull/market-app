import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMegaport(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm0 2l-1 1v2.672l-2 2v3.035l-3 2.398V22l1 1 1-1v-2.934l1.5-1.2 1.5 1.2V22l1 1 1-1v-2.934l1.5-1.2 1.5 1.2V22l1 1 1-1v-3.894l-3-2.399v-3.035l-2-2V8l-1-1zm0 5.5l1 1v2.672l-1 1-1-1V13.5l1-1z'
    })
  );
}
export default SvgMegaport;
