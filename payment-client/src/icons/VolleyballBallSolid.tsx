import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVolleyballBallSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.855 3 3 8.855 3 16s5.855 13 13 13 13-5.855 13-13S23.145 3 16 3zm0 2c2.355 0 4.55.758 6.344 2.031a19.253 19.253 0 00-5.938-.5c-1.304.094-2.43.29-3.281.5-.273.067-.45.125-.656.188a9.378 9.378 0 01-.156-1.563A10.896 10.896 0 0116 5zm-5.625 1.594c.055.539.168 1.183.344 1.906-.004.2.05.395.156.563.328 1.16.828 2.472 1.625 3.843.02.031.04.063.063.094a18.17 18.17 0 002.343 3.156c-.254.864-.566 1.66-.906 2.375-.578-.527-1.309-1.304-2.094-2.437-1.328-1.914-2.594-4.672-2.656-8.375a1.03 1.03 0 00-.063-.344c.368-.29.786-.54 1.188-.781zm7.063 1.875c2.187-.047 4.824.293 7.468 1.562.121.082.262.133.407.156.32.508.609 1.032.843 1.594-3.113-1.394-6-1.664-8.281-1.5a14.916 14.916 0 00-4.063.844A15.18 15.18 0 0113 9.156c.195-.058.375-.125.625-.187.75-.188 1.734-.387 2.906-.469.293-.02.594-.023.907-.031zM7.344 9.25c.34 3.41 1.59 6.07 2.906 7.969A16.71 16.71 0 0013 20.312a14.834 14.834 0 01-1.406 1.782 17.645 17.645 0 01-2.344-2.907c-1.355-2.097-2.59-4.992-2.469-8.468a.993.993 0 00-.093-.531c.203-.32.421-.641.656-.938zm11.593 3c2.176-.027 4.844.402 7.72 2 .058.04.12.07.187.094.074.492.148.992.156 1.5-1.309-.586-3.41-1.29-6.156-1.344a1 1 0 00-.594-.063 1.056 1.056 0 00-.188.063H20a17.899 17.899 0 00-3.469.469 15.988 15.988 0 01-1.687-2.094 14.042 14.042 0 014.094-.625zM5.126 14.406c.492 2.309 1.438 4.293 2.438 5.844a18.75 18.75 0 002.625 3.25c-.489.414-.899.71-1.22.938C6.544 22.418 5 19.39 5 16c0-.54.05-1.074.125-1.594zm16.219 2.125c.785.043 1.508.117 2.156.25-.023.203-.047.39-.094.657a15.104 15.104 0 01-.812 2.843c-.86 2.168-2.422 4.676-5.344 6.407a.951.951 0 00-.25.25A10.57 10.57 0 0116 27c-.477 0-.945-.035-1.406-.094a16.736 16.736 0 005.469-6.468c.574-1.2.917-2.29 1.125-3.157.07-.297.113-.515.156-.75zm-2.157.032c.043-.004.086.003.125 0-.019.093-.039.148-.062.25-.176.742-.496 1.695-1 2.75-1.008 2.105-2.781 4.585-6 6.468a.984.984 0 00-.281.188c-.45-.18-.864-.39-1.281-.625.324-.25.718-.57 1.124-.938a.999.999 0 001.031-1 16.76 16.76 0 002.188-2.906.986.986 0 00.188-.344c.566-1 1.066-2.144 1.469-3.437a16.044 16.044 0 012.5-.407zm6.25.78c.594.216 1.051.427 1.375.595a11.01 11.01 0 01-4.78 7.25 15.57 15.57 0 002.437-4.157c.488-1.23.75-2.351.906-3.218.035-.192.04-.31.063-.47z'
    })
  );
}
export default SvgVolleyballBallSolid;
