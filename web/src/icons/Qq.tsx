import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgQq(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 5.887c6.086 0 6.395 5.437 6.73 6.508 0 0 .48.535.594 1.351.074.527-.226 1.125-.226 1.125s1.945 2.621 1.945 4.68c0 1.285-.379 1.949-.82 1.949-.446 0-1.094-1.36-1.094-1.36s-1.016 2.169-1.524 2.481c-.507.309 1.832.649 1.832 1.66 0 1.016-1.859 1.465-3.378 1.465-1.524 0-3.946-.789-3.946-.789l-.875-.027s-.675.957-3.465.957c-2.789 0-4-.758-4-1.66 0-1.215 1.778-1.38 1.778-1.38s-1.133-.316-2.09-2.995c0 0-.664 1.445-1.602 1.445 0 0-.394-.235-.394-1.55 0-2.724 1.957-4.052 2.8-4.868 0 0-.14-.356-.066-.797.082-.492.375-.789.375-.789s-.11-.59.301-1.066c.082-1.325 1.04-6.34 7.125-6.34m0-2c-6.398 0-8.668 4.59-9.07 7.668-.192.375-.301.761-.344 1.125a3.52 3.52 0 00-.399 1.383c-1.109 1.019-2.722 2.757-2.722 5.683 0 2.031.746 2.899 1.375 3.27l.469.28H5.91c-.09.286-.137.595-.137.93 0 .86.434 3.665 6 3.665 2.04 0 3.313-.442 4.094-.914.82.246 2.738.77 4.188.77 3.27 0 5.383-1.36 5.383-3.466 0-.375-.075-.707-.196-1.004.965-.437 1.797-1.566 1.797-3.726 0-1.895-1.047-3.883-1.758-5.016.055-.324.074-.687.024-1.062a4.83 4.83 0 00-.723-1.926l-.023-.117C23.512 6.422 20.629 3.887 16 3.887z',
    })
  );
}
export default SvgQq;
