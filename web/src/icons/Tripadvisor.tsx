import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTripadvisor(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 6.594c-4.254 0-8.223 1.14-10.938 2.968H0c.828.97 1.441 2.29 1.594 3.188a7.946 7.946 0 00-1.532 4.688 7.972 7.972 0 007.97 7.968c2.495 0 4.726-1.172 6.187-2.968.594.695 1.582 2.093 1.781 2.5 0 0 1.137-1.68 1.781-2.47a7.972 7.972 0 0014.156-5.031 7.955 7.955 0 00-1.53-4.687c.152-.898.765-2.219 1.593-3.188h-5.313C23.974 7.734 20.25 6.595 16 6.595zm0 1.343c2.852 0 5.438.536 7.719 1.532A7.976 7.976 0 0016 17.438c0-4.395-3.543-7.961-7.938-7.97 2.278-.991 5.09-1.53 7.938-1.53zM8.031 11c3.543 0 6.406 2.898 6.406 6.438a6.402 6.402 0 01-6.406 6.406 6.4 6.4 0 01-6.406-6.407C1.625 13.899 4.488 11 8.031 11zm15.938 0c3.539 0 6.406 2.898 6.406 6.438a6.402 6.402 0 01-6.406 6.406 6.4 6.4 0 01-6.407-6.407c0-3.539 2.864-6.437 6.407-6.437zM7.937 13.531a3.88 3.88 0 00-3.875 3.875 3.88 3.88 0 003.875 3.875 3.88 3.88 0 003.875-3.875 3.88 3.88 0 00-3.874-3.875zm16.032 0a3.88 3.88 0 00-3.875 3.875c0 2.137 1.738 3.844 3.875 3.844 2.136 0 3.875-1.707 3.875-3.844a3.88 3.88 0 00-3.875-3.875zM7.937 14.72a2.692 2.692 0 012.688 2.687 2.692 2.692 0 01-2.688 2.688 2.692 2.692 0 01-2.687-2.688 2.692 2.692 0 012.688-2.687zm16.032 0a2.692 2.692 0 012.687 2.687c0 1.48-1.207 2.657-2.687 2.657-1.48 0-2.688-1.176-2.688-2.657a2.692 2.692 0 012.688-2.687zM7.75 16.094a1.32 1.32 0 00-1.313 1.312A1.32 1.32 0 007.75 18.72c.719 0 1.281-.594 1.281-1.313 0-.718-.562-1.312-1.281-1.312zm16 0c-.719 0-1.281.593-1.281 1.312 0 .719.562 1.282 1.281 1.282.719 0 1.313-.563 1.313-1.282a1.32 1.32 0 00-1.313-1.312z',
    })
  );
}
export default SvgTripadvisor;
