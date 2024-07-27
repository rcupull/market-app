import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserGraduateSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3L3 7l3.105.953L9 8.843v2.665c-.125.152-.219.3-.293.457-.18.379-.293.8-.395 1.3-.19.95-.292 2.176-.304 3.52A2.974 2.974 0 007 19c0 1.277.906 2.2 2.035 2.629.453 1.305 1.207 2.738 2.293 3.953C12.516 26.906 14.102 28 16 28c1.898 0 3.484-1.094 4.672-2.418 1.086-1.215 1.84-2.648 2.293-3.953C24.094 21.199 25 20.277 25 19a2.99 2.99 0 00-1.012-2.23c-.011-1.34-.113-2.56-.3-3.504-.102-.5-.215-.922-.395-1.301a2.196 2.196 0 00-.293-.457V8.844L29 7zm0 2.094L22.203 7 16 8.906 9.797 7zM11 9.46L16 11l.297-.09L21 9.46v2.321c-.012.016 0 .02-.047.051-.156.133-.48.324-.926.504-.894.355-2.28.664-4.027.664-1.746 0-3.133-.309-4.027-.664-.446-.18-.77-.371-.926-.504-.047-.031-.035-.035-.047-.05zm-.734 4.246c.289.176.601.34.968.484 1.176.47 2.79.809 4.766.809 1.977 0 3.59-.34 4.766-.809a6.22 6.22 0 00.968-.484c.157.809.266 1.988.266 3.293v.848l.5.293c.305.172.5.48.5.859a.982.982 0 01-.922.988l-.672.055-.199.645c-.332 1.082-1.074 2.496-2.031 3.562C18.223 25.316 17.109 26 16 26c-1.11 0-2.223-.684-3.176-1.75-.957-1.066-1.699-2.48-2.031-3.563l-.2-.644-.671-.055A.982.982 0 019 19c0-.375.2-.684.508-.86l.512-.296L10 17v-.012c0-1.297.11-2.472.266-3.281zM8.172 17h.832l-.84.02zM13 18c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z',
    }),
  );
}
export default SvgUserGraduateSolid;
