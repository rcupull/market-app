import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDribbble(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c2.535 0 4.832.953 6.594 2.5a6.99 6.99 0 01-.844.969c-.855.828-2.223 1.824-4.313 2.594A47.686 47.686 0 0013.72 6.25C14.449 6.082 15.215 6 16 6zm-4.25.938a46.68 46.68 0 013.75 5.718c-4.066 1.078-7.797 1.215-9.281 1.219a9.978 9.978 0 015.531-6.938zm12.219 3.03A9.99 9.99 0 0126 15.75c-.89-.2-2.203-.395-3.906-.406-.887-.004-1.89.058-2.969.187-.25-.57-.52-1.12-.781-1.656 2.242-.86 3.77-1.992 4.781-2.969.344-.336.613-.644.844-.937zm-7.563 4.5c.23.466.465.942.688 1.438-4.274 1.184-7.344 4.809-8.657 6.625A9.963 9.963 0 016 16v-.125c1.352.016 5.648-.078 10.406-1.406zm5.688 2.845c1.785 0 3.02.25 3.75.437a9.928 9.928 0 01-4.094 6.438 35.775 35.775 0 00-1.844-6.75c.79-.079 1.535-.125 2.188-.125zm-4.219.468c.898 2.282 1.652 4.785 2.031 7.438A10.06 10.06 0 0116 26c-2.293 0-4.41-.77-6.094-2.063 1.028-1.406 4.047-5.148 7.969-6.156z',
    }),
  );
}
export default SvgDribbble;
