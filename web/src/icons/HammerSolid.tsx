import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHammerSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M7.063 2l2.5 1.813c4.714 3.398 6.144 6.73 6.437 7.468l-.906.906v.032l-.688.687L2.687 25.062l-.687.72 4.25 4.25.719-.75 12.406-12.845.313-.375.093-.062.969-.344.188.188-.375.906-.282.625 3.313 3.313 6.375-6.375-2.844-2.844-.469-.438-.593.219-.907.344-.218-.219.312-1 .125-.406-.188-.375S24.134 7.637 21.75 5.75C19.367 3.863 15.594 2 10.156 2zm6.03 2.25c3.368.5 5.798 1.766 7.438 3.063C22.297 8.71 23 9.842 23.22 10.219l-.375 1.156-.157.563.407.437 1.593 1.594.625-.25.875-.344.938.938-3.531 3.53-.938-.937.375-.906.282-.625-.5-.469-1.125-1.125-.438-.469-.625.22-1.781.718-.188.063-.718-.688-.72-.719 1.157-1.156-.219-.594s-1.343-3.394-5.062-6.906zm2.72 10.063l1.437 1.437L6.219 27.156 4.812 25.75z',
    })
  );
}
export default SvgHammerSolid;
