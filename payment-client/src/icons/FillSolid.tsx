import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFillSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11.313 3.281L9.905 4.72 11.687 6.5l-6.906 6.906a3.063 3.063 0 000 4.313l.063.062 6.343 6.313a3.063 3.063 0 004.313 0l7.594-7.594.718-.688-9.718-9.718-.781-.813-.22-.187zm1.812 4.656L21 15.813l-6.906 6.876a1.054 1.054 0 01-1.5 0L6.219 16.28a1.017 1.017 0 010-1.468zM25 19.25l-.813 1.188s-.539.753-1.062 1.656c-.262.453-.508.926-.719 1.406-.21.48-.406.922-.406 1.5 0 1.645 1.355 3 3 3s3-1.355 3-3c0-.578-.195-1.02-.406-1.5-.211-.48-.457-.953-.719-1.406-.523-.903-1.063-1.657-1.063-1.657zm0 3.625c.066.11.059.102.125.219.238.41.492.847.656 1.218.164.372.219.715.219.688 0 .555-.445 1-1 1-.555 0-1-.445-1-1 0 .027.055-.316.219-.688.164-.37.418-.808.656-1.218.066-.117.059-.11.125-.219z'
    })
  );
}
export default SvgFillSolid;
