import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBrushSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M19 2.031l-.719.688-5.562 5.594L12 9l-1 1-2.281 2.313-.563.562.438.688s.61.937 1.094 1.968c.242.516.46 1.063.53 1.438.036.187.04.3.032.343-.11.086-1.426 1.13-3 2.407-1.64 1.328-3.383 2.726-4.094 3.437a4.013 4.013 0 000 5.657c1.547 1.546 4.07 1.535 5.625 0h.031c.715-.715 2.149-2.43 3.47-4.063 1.288-1.594 2.374-2.95 2.437-3.031-.004.004.043-.063.406 0 .363.062.879.25 1.375.5a15.816 15.816 0 011.906 1.156l.688.5.593-.594L22 21l1-1 .688-.719 5.593-5.562.688-.719-.688-.719L19.72 2.72zm1.313 5.219c.19.016.34.09.468.219.512.515-.234 2.52-.593 3.375-.36.86-.247 1.531.218 2 .793.8 2.89-1.082 3.782-.188.886.895-.727 2.797-.157 3.375l.032.032-1.782 1.78-8.125-8.124 1.375-1.375c.02.023.04.039.063.062.68.684 2.074.031 2.656-.344.688-.44 1.492-.859 2.063-.812zm-7.594 3.906l8.125 8.125-.282.282-1.718 1.75c-.387-.266-.657-.485-1.438-.875-.597-.297-1.246-.57-1.937-.688-.692-.117-1.567-.09-2.188.531l-.031.063-.031.031s-1.18 1.496-2.5 3.125-2.852 3.445-3.313 3.906c-.789.79-2.023.79-2.812 0a1.967 1.967 0 010-2.812c.46-.461 2.277-1.992 3.906-3.313 1.629-1.32 3.125-2.5 3.125-2.5l.031-.031.063-.031c.633-.63.594-1.465.469-2.125-.126-.66-.407-1.305-.688-1.907-.379-.812-.602-1.109-.844-1.5l1.781-1.75zm-6.469 13.5c-.605 0-1.094.489-1.094 1.094 0 .605.489 1.094 1.094 1.094.605 0 1.094-.489 1.094-1.094 0-.605-.489-1.094-1.094-1.094z',
    })
  );
}
export default SvgBrushSolid;
