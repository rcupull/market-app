import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSpeakerDeck(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8 8c-2.757 0-5 2.243-5 5s2.243 5 5 5h6a1.001 1.001 0 010 2H5a2 2 0 000 4h9c2.757 0 5-2.243 5-5s-2.243-5-5-5H8a1.001 1.001 0 010-2h7a2 2 0 000-4H8zm10.445 0c.344.59.555 1.268.555 2 0 .734-.217 1.409-.56 2H24a1 1 0 011 1v6a1 1 0 01-1 1h-3.08a6.978 6.978 0 01-2.031 4H25a4 4 0 004-4v-8a4 4 0 00-4-4h-6.555z'
    })
  );
}
export default SvgSpeakerDeck;
