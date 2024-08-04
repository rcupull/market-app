import { render } from '@testing-library/react';

import { Footer } from '.';

import { getWrapper } from 'utils/test-utils';

describe('Footer', () => {
  it('render', async () => {
    const result = render(
      <Footer
        socialLinks={{
          face: 'face',
          instagram: 'instagram',
          linkedin: 'linkedin',
          twitter: 'twitter',
          youtube: 'youtube'
        }}
      />,
      { wrapper: getWrapper({ useRouter: true }) }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <footer
          class="shadow-lg -scale-y-100"
        >
          <div
            class="no-preflight -scale-y-100 flex flex-col items-center bg-white shadow-xl text-center text-gray-700"
          >
            <div
              class="container px-6 pt-2 flex flex-col-reverse sm:flex-row sm:justify-between"
            >
              <div
                class="flex flex-col"
              >
                <a
                  href="/terms-and-conditions"
                >
                  Términos y Condiciones
                </a>
                <a
                  href="/privacy-policy"
                >
                  Política de Privacidad
                </a>
              </div>
              <div
                class="flex justify-center"
              >
                <a
                  class="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  href="face"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    class="size-7 fill-blue-700"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M19.254 2C15.312 2 13 4.082 13 8.826V13H8v5h5v12h5V18h4l1-5h-5V9.672C18 7.885 18.583 7 20.26 7H23V2.205C22.526 2.141 21.145 2 19.254 2z"
                    />
                  </svg>
                </a>
                <a
                  class="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  href="instagram"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    class="size-7 fill-red-500"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M11.469 5C7.918 5 5 7.914 5 11.469v9.062C5 24.082 7.914 27 11.469 27h9.062C24.082 27 27 24.086 27 20.531V11.47C27 7.918 24.086 5 20.531 5zm0 2h9.062A4.463 4.463 0 0125 11.469v9.062A4.463 4.463 0 0120.531 25H11.47A4.463 4.463 0 017 20.531V11.47A4.463 4.463 0 0111.469 7zm10.437 2.188a.902.902 0 00-.906.906c0 .504.402.906.906.906a.902.902 0 00.907-.906.902.902 0 00-.907-.906zM16 10c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2c2.223 0 4 1.777 4 4s-1.777 4-4 4-4-1.777-4-4 1.777-4 4-4z"
                    />
                  </svg>
                </a>
                <a
                  class="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  href="linkedin"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    class="size-7 fill-white bg-blue-500 rounded-lg"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M8.643 4A2.641 2.641 0 006 6.64C6 8.1 7.183 9.31 8.64 9.31c1.459 0 2.643-1.21 2.643-2.668A2.64 2.64 0 008.643 4zm12.892 7c-2.219 0-3.488 1.16-4.098 2.314h-.064v-2.003H13V26h4.557v-7.271c0-1.916.144-3.768 2.515-3.768 2.337 0 2.371 2.185 2.371 3.889V26H27v-8.068C27 13.984 26.151 11 21.535 11zm-15.172.31V26h4.56V11.31h-4.56z"
                    />
                  </svg>
                </a>
                <a
                  class="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  href="twitter"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    class="size-7 fill-white bg-blue-500 rounded-lg"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M28 8.559a9.813 9.813 0 01-2.828.773 4.94 4.94 0 002.164-2.723 9.92 9.92 0 01-3.125 1.196 4.924 4.924 0 00-8.52 3.367c0 .387.043.762.13 1.121A13.957 13.957 0 015.67 7.148a4.885 4.885 0 00-.667 2.477c0 1.707.867 3.215 2.191 4.098a4.895 4.895 0 01-2.23-.618v.063a4.922 4.922 0 003.95 4.828 4.902 4.902 0 01-2.224.086 4.932 4.932 0 004.598 3.422A9.875 9.875 0 014 23.539a13.924 13.924 0 007.547 2.215c9.058 0 14.012-7.504 14.012-14.012 0-.21-.008-.426-.016-.637A10.085 10.085 0 0028 8.56z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div
              class="w-full p-4 text-center"
            >
              © 2024 Todos los derechos reservados
            </div>
          </div>
        </footer>
      </div>
    `);
  });
});
