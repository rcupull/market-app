import { render } from '@testing-library/react';

import { Component } from './Component';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component portal={portalDummy} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex min-h-full flex-col justify-center"
        >
          <div
            class="sm:mx-auto sm:w-full sm:max-w-sm"
          >
            <div
              class="flex justify-center"
            >
              <img
                alt="Market Logo"
                class="h-36 sm:h-48"
                src="/logo-2.png"
              />
            </div>
            <h2
              class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Inicia sesión en tu cuenta
            </h2>
          </div>
          <div
            class="mt-10"
          >
            <form>
              <div
                class=""
                data-id="FormFieldWrapper"
              >
                <div
                  class=""
                >
                  <div
                    class="flex items-center h-7 mb-2"
                  >
                    <label
                      class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                    >
                      Correo Electrónico *
                    </label>
                  </div>
                  <div
                    class="relative h-9"
                  >
                    <input
                      autocomplete="email"
                      class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
                      id="email"
                      name="email"
                      type="email"
                      value=""
                    />
                  </div>
                </div>
                <span
                  class="text-red-500 text-xs"
                />
              </div>
              <div
                class="mt-6"
                data-id="FormFieldWrapper"
              >
                <div
                  class=""
                >
                  <div
                    class="flex items-center h-7 mb-2"
                  >
                    <label
                      class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                    >
                      Contraseña *
                    </label>
                  </div>
                  <div
                    class="relative h-9"
                  >
                    <input
                      autocomplete="current-password"
                      class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed !pr-10"
                      id="password"
                      name="password"
                      type="password"
                      value=""
                    />
                    <div
                      class="absolute h-full top-0 right-0 flex items-center"
                    >
                      <div>
                        <svg
                          class="size-6 fill-gray-500 cursor-pointer mx-2"
                          height="1em"
                          viewBox="0 0 32 32"
                          width="1em"
                        >
                          <path
                            d="M16 8C7.664 8 1.25 15.344 1.25 15.344L.656 16l.594.656s5.848 6.668 13.625 7.282c.371.046.742.062 1.125.062s.754-.016 1.125-.063c7.777-.613 13.625-7.28 13.625-7.28l.594-.657-.594-.656S24.336 8 16 8zm0 2c2.203 0 4.234.602 6 1.406.637 1.055 1 2.27 1 3.594a6.995 6.995 0 01-6.219 6.969c-.02.004-.043-.004-.062 0-.239.011-.477.031-.719.031-.266 0-.523-.016-.781-.031A6.995 6.995 0 019 15c0-1.305.352-2.52.969-3.563h-.031C11.717 10.617 13.773 10 16 10zm0 2a3 3 0 10.002 6.002A3 3 0 0016 12zm-8.75.938A9.006 9.006 0 007 15c0 1.754.5 3.395 1.375 4.781A23.196 23.196 0 013.531 16a23.93 23.93 0 013.719-3.063zm17.5 0A23.93 23.93 0 0128.469 16a23.196 23.196 0 01-4.844 3.781A8.929 8.929 0 0025 15c0-.715-.094-1.398-.25-2.063z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  class="text-red-500 text-xs"
                />
              </div>
              <div
                class="w-100 text-sm pt-4"
              >
                No tienes una cuenta?
                 
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit !inline-block !whitespace-pre-line"
                >
                  Regístrate gratis
                </button>
                 
                para obtener los beneficios de nuestro sistema. También puedes
                 
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit !inline-block !whitespace-pre-line"
                >
                  saber más de nosotros
                </button>
                 
                o darle un vistazo a los
                 
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit !inline-block !whitespace-pre-line"
                >
                  precios
                </button>
                 
                de nuestros servicios.
              </div>
            </form>
          </div>
        </div>
      </div>
    `);
  });
});
