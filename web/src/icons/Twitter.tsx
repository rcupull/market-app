import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTwitter(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M28 8.559a9.813 9.813 0 01-2.828.773 4.94 4.94 0 002.164-2.723 9.92 9.92 0 01-3.125 1.196 4.924 4.924 0 00-8.52 3.367c0 .387.043.762.13 1.121A13.957 13.957 0 015.67 7.148a4.885 4.885 0 00-.667 2.477c0 1.707.867 3.215 2.191 4.098a4.895 4.895 0 01-2.23-.618v.063a4.922 4.922 0 003.95 4.828 4.902 4.902 0 01-2.224.086 4.932 4.932 0 004.598 3.422A9.875 9.875 0 014 23.539a13.924 13.924 0 007.547 2.215c9.058 0 14.012-7.504 14.012-14.012 0-.21-.008-.426-.016-.637A10.085 10.085 0 0028 8.56z'
    })
  );
}
export default SvgTwitter;
