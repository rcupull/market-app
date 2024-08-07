import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCuttlefish(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17 3C9.831 3 4 8.831 4 16s5.832 13 13 13c3.641 0 7.017-1.465 9.502-4.125l.875-.936-1.07-.707c-3.085-2.764-4.369-5.737-4.522-6.109C20.62 18.684 18.79 20 17 20a4 4 0 010-8c1.793 0 3.628 1.32 4.795 2.887.137-.307 1.884-4.151 4.512-6.12l1.07-.706-.875-.936A12.88 12.88 0 0017 3zm0 2c2.751 0 5.323.989 7.34 2.803-1.271 1.147-2.301 2.567-3.045 3.779C20.073 10.667 18.59 10 17 10c-3.308 0-6 2.692-6 6s2.692 6 6 6c1.591 0 3.075-.67 4.297-1.586a21.2 21.2 0 003.078 3.75A10.881 10.881 0 0117 27c-6.065 0-11-4.935-11-11S10.934 5 17 5z'
    })
  );
}
export default SvgCuttlefish;
