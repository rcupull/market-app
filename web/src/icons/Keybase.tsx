import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgKeybase(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.717 4c-.54.75-.934 1.29-1.313 1.848a1.708 1.708 0 00-1.216-.612c-1.522-.096-1.437-.09-1.506-.09a1.75 1.75 0 00-1.735 1.64l-.084 1.403v.006a1.75 1.75 0 001.633 1.844l1.063.065c-.091.9.053 1.741.416 2.464a11.233 11.233 0 00-3.688 2.502c-3.349 3.348-3.281 7.519-3.281 11.532l1.27-1.35c.262.968.662 1.893 1.185 2.748h1.535a9.313 9.313 0 01-1.666-3.873l2.13-2.268-1.009 3.178c2.247-1.639 5.7-4.704 12.52-2.695 1.803.525 3.723.038 4.582-1.543.432 2.116.058 5.121-1.196 7.195h1.457c.78-1.559 1.186-3.433 1.186-5.517 0-2.637-1.126-5.306-3.078-7.32-1.66-1.71-3.383-2.45-4.397-2.776a4.087 4.087 0 00-2.46-5.482c-.988-.333-1.521-.305-1.73-.305-.005-.005-.245-.392.481-1.946L14.716 4zm-4.03 2.428c.023 0-.095-.01 1.426.086.533.037.421.633.416.74-.284.5-.519 1.027-.699 1.574l-1.254-.074a.465.465 0 01-.431-.488l.084-1.405a.458.458 0 01.459-.433zm3.46.615c.203.517.71.847 1.263.82.395-.016 2.163.14 2.899 1.7.389.835.463 2.254-.647 3.261l-.447-.55c-1.296-1.308-2.819-.2-2.819.937a2.796 2.796 0 01-1.189-1.072c-1.046-1.747.208-3.959.94-5.096zm-3.192.144l-.053.836.832.055.053-.836-.832-.054zm5.053 5.782a.29.29 0 01.219.119l2.95 3.648c.257.316-.219.713-.48.391l-.293-.363-1.047.855a.238.238 0 01-.336-.031l-.474-.584a.239.239 0 01.031-.336l1.053-.863-.428-.528-.517.43c-.256.209-.642-.3-.397-.504l.514-.424-1.057-1.3c-.196-.237.03-.52.262-.51zm2.803.515c.416.13.822.284 1.22.461 1.643.734 3.014 1.967 3.916 3.237.816 1.157.956 2.341.366 3.175-.582.831-1.73 1.115-2.989.745-3.917-1.157-7.447-.895-10.531.771l1.594-5.014c-6.291 6.698-5.644 6.013-6.082 6.479.059-1.57.265-3.216 1.06-4.834.71-1.436 2.43-3.778 5.406-4.887.853.815 1.894 1.077 2.278 1.147a1.535 1.535 0 00.246 1.607 1.536 1.536 0 00.266 1.438l.474.584c.288.357.723.563 1.18.562.646 0 1.03-.406 1.185-.53.848.31 1.478-.204 1.547-.263a1.601 1.601 0 00.225-2.244l-1.703-2.102c.12-.102.236-.213.342-.332zm.595 10.92a.952.952 0 00-.949.955.95.95 0 101.9 0 .956.956 0 00-.95-.955zm-5.9.006a.95.95 0 00-.95.953c0 .527.425.955.95.955.525 0 .95-.428.95-.955a.953.953 0 00-.95-.953z'
    })
  );
}
export default SvgKeybase;
