import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAviato(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.11 11L0 17.57h.85l.95-2.09h2.61l.94 2.09h.87L3.11 11zm14.39 0l-3.12 6.56h.87l.95-2.09h1.206l-.086 1.93s-1.13.33-1.27 1.19a.13.13 0 00-.01.06l-3.24-.1 3.24.41c0 .11.01.21.03.32.01.13.03.24.06.36L4 19l4.43.46v.32a.616.616 0 00-.52.61c0 .34.28.62.62.62a.617.617 0 00.09-1.23v-.29l4.02.45v.27c-.28.05-.5.31-.5.61 0 .34.28.51.62.51.34 0 .62-.17.62-.51 0-.3-.21-.56-.49-.61v-.25l1.42.16v1.19h-.3V22h.3v-.32h.25V22h.29v-.68h-.29v-1.17l1.92.22c.4.57.94.68.94.68v.33l-.25.01-.01.61h.2l.01-.25h.26l.01.25h.2l-.01-.61-.25-.01-.01-.33s.55-.11.95-.68l1.92-.22v1.17h-.3V22h.3v-.32h.25V22h.3v-.68h-.3v-1.19l1.42-.16v.25c-.28.05-.49.31-.49.6 0 .34.27.51.62.51.34 0 .61-.17.61-.51 0-.3-.21-.55-.49-.6v-.28l4.01-.45v.29a.626.626 0 00-.52.62c0 .33.28.62.62.62.34 0 .62-.29.62-.62-.01-.32-.24-.58-.53-.62v-.32L31 19l-12.15.63c.04-.11.06-.22.08-.35.01-.11.02-.21.02-.33l3.24-.41-3.24.1v-.05c-.15-.87-1.28-1.19-1.28-1.19l-.082-1.93H18.8l.949 2.09h.86L17.5 11zm11 .14c-.46 0-.89.08-1.29.25-.4.18-.75.3-1.05.6a3.222 3.222 0 00-.97 2.35c0 .46.08.88.25 1.29.17.4.42.75.72 1.04.3.31.65.55 1.05.72.4.17.83.26 1.29.26.46 0 .89-.09 1.29-.26s.75-.41 1.06-.72c.3-.29.53-.65.7-1.04.17-.41.26-.83.26-1.29 0-.46-.09-.9-.26-1.29-.17-.41-.4-.76-.7-1.06-.31-.31-.66-.42-1.06-.6-.4-.17-.83-.25-1.29-.25zm-22.61.07l3.12 6.57 3.1-6.57h-.85l-2.25 4.8-2.26-4.8h-.86zm7.225.003v6.357h.77v-6.357h-.77zm6.9 0v.576h2.069v5.781h.854v-5.78h2.046v-.577h-4.968zm8.485.547c.34 0 .68.06.98.2.32.14.59.31.82.54.23.24.41.51.54.81.13.32.19.66.19 1.03 0 .35-.06.69-.19 1.01-.13.31-.31.59-.54.81-.23.24-.5.42-.82.55-.3.14-.64.2-.98.2-.35 0-.68-.06-.99-.2-.31-.13-.59-.31-.81-.55-.23-.22-.42-.5-.54-.81-.13-.32-.2-.65-.2-1.01s.07-.71.2-1.03c.12-.3.31-.57.54-.81.24-.22.5-.4.81-.54.31-.14.64-.2.99-.2zm-25.39.9l.98 2.13H2.13l.98-2.13zm14.39 0l.97 2.13h-.911l-.059-1.41-.063 1.41h-.917l.98-2.13z'
    })
  );
}
export default SvgAviato;
