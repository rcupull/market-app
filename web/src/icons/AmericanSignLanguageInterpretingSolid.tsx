import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAmericanSignLanguageInterpretingSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9.219 7.375L6.813 10.25l-.157.188-.031.25L6 13.405V9H4v7l-1 1v6l4.375-.969 2.25.907.188.062h.812l.219-.156 2.687-1.594.25-.188.156-.28 1-2.407-1.874-.75-.876 2.094-1.562.968C9.859 20.508 8 19.872 8 18c0-2.332 2-3 2-3h1.563l1.718 1.719 1.438-1.438-2-2-.313-.281h-1.844l.188-.281 2.531-1.563L12.22 9.47l-2.75 1.687-.188.094-1.125 1.688.375-1.626 2.25-2.687zM21.375 9l-.219.156-2.687 1.594-.25.188-.157.28-1 2.407 1.875.75.875-2.094 1.563-.969C22.141 11.492 24 12.13 24 14c0 2.332-2 3-2 3h-1.563l-1.718-1.719-1.438 1.438 2 2 .313.281h1.843l-.187.281-2.531 1.563 1.062 1.687 2.75-1.687.188-.094 1.125-1.688-.375 1.625-2.25 2.688 1.562 1.25 2.407-2.875.156-.188.031-.25.625-2.718V23h2v-7l1-1V9l-4.375.969-2.25-.906L22.187 9z',
    }),
  );
}
export default SvgAmericanSignLanguageInterpretingSolid;
