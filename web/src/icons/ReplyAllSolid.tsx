import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgReplyAllSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10.281 5.281l-8 8-.687.719.687.719 8 8 1.438-1.438L4.438 14l7.28-7.281zm5 0l-8 8-.687.719.687.719 8 8 1.438-1.438L10.437 15H23c2.773 0 5 2.227 5 5s-2.227 5-5 5v2c3.855 0 7-3.145 7-7s-3.145-7-7-7H10.437l6.282-6.281z'
    })
  );
}
export default SvgReplyAllSolid;
