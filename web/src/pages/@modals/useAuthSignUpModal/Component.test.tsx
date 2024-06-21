import { render } from '@testing-library/react';

import { Component } from './Component';

import { dummiPortal } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component portal={dummiPortal} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8"
        >
          <div
            class="sm:mx-auto sm:w-full sm:max-w-sm"
          >
            <div
              class="flex justify-center"
            >
              <div
                class="px-2 py-0.5 rounded-full bg-white h-14 !size-28"
              >
                <img
                  alt="Market Logo"
                  class="h-full"
                  src="/logo.png"
                />
              </div>
            </div>
            <h2
              class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Registrarse
            </h2>
          </div>
          <div
            class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
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
                      Nombre *
                    </label>
                  </div>
                  <div
                    class="relative h-9"
                  >
                    <input
                      autocomplete="name"
                      class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
                      id="name"
                      name="name"
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
                      Correo electrónico *
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
                class="relative"
              >
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
                        autocomplete="password"
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
                  class="mt-3"
                >
                  <div
                    class="flex flex-col"
                  >
                    <div
                      class="flex items-center text-sm my-0.5 text-red-600 fill-red-600"
                    >
                      <svg
                        class="size-4"
                        height="1em"
                        viewBox="0 0 32 32"
                        width="1em"
                      >
                        <path
                          d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-3.781 5.781L10.78 12.22 14.562 16l-3.78 3.781 1.437 1.438L16 17.437l3.781 3.782 1.438-1.438L17.437 16l3.782-3.781-1.438-1.438L16 14.562z"
                        />
                      </svg>
                      <span
                        class="ml-2"
                      >
                        Longitud mínima de 8 caracteres.
                      </span>
                    </div>
                    <div
                      class="flex items-center text-sm my-0.5 text-red-600 fill-red-600"
                    >
                      <svg
                        class="size-4"
                        height="1em"
                        viewBox="0 0 32 32"
                        width="1em"
                      >
                        <path
                          d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-3.781 5.781L10.78 12.22 14.562 16l-3.78 3.781 1.437 1.438L16 17.437l3.781 3.782 1.438-1.438L17.437 16l3.782-3.781-1.438-1.438L16 14.562z"
                        />
                      </svg>
                      <span
                        class="ml-2"
                      >
                        Requiere un número como mínimo.
                      </span>
                    </div>
                    <div
                      class="flex items-center text-sm my-0.5 text-red-600 fill-red-600"
                    >
                      <svg
                        class="size-4"
                        height="1em"
                        viewBox="0 0 32 32"
                        width="1em"
                      >
                        <path
                          d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-3.781 5.781L10.78 12.22 14.562 16l-3.78 3.781 1.437 1.438L16 17.437l3.781 3.782 1.438-1.438L17.437 16l3.782-3.781-1.438-1.438L16 14.562z"
                        />
                      </svg>
                      <span
                        class="ml-2"
                      >
                        Requiere un carácter especial.
                      </span>
                    </div>
                    <div
                      class="flex items-center text-sm my-0.5 text-red-600 fill-red-600"
                    >
                      <svg
                        class="size-4"
                        height="1em"
                        viewBox="0 0 32 32"
                        width="1em"
                      >
                        <path
                          d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-3.781 5.781L10.78 12.22 14.562 16l-3.78 3.781 1.437 1.438L16 17.437l3.781 3.782 1.438-1.438L17.437 16l3.782-3.781-1.438-1.438L16 14.562z"
                        />
                      </svg>
                      <span
                        class="ml-2"
                      >
                        Requiere una letra mayúscula como mínimo.
                      </span>
                    </div>
                    <div
                      class="flex items-center text-sm my-0.5 text-red-600 fill-red-600"
                    >
                      <svg
                        class="size-4"
                        height="1em"
                        viewBox="0 0 32 32"
                        width="1em"
                      >
                        <path
                          d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-3.781 5.781L10.78 12.22 14.562 16l-3.78 3.781 1.437 1.438L16 17.437l3.781 3.782 1.438-1.438L17.437 16l3.782-3.781-1.438-1.438L16 14.562z"
                        />
                      </svg>
                      <span
                        class="ml-2"
                      >
                        Requiere una letra minúsculas como mínimo.
                      </span>
                    </div>
                  </div>
                </div>
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
                      Confirmar contraseña *
                    </label>
                  </div>
                  <div
                    class="relative h-9"
                  >
                    <input
                      class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed !pr-10"
                      id="confirmPassword"
                      name="confirmPassword"
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
                class="flex flex-col bg-red-100 mt-10 p-5 rounded-sm"
              >
                <span
                  class="text-sm"
                >
                  Regístrese como propietario de negocios marcando la siguiente casilla:
                </span>
                <div
                  class="w-fit mt-2"
                  data-id="FormFieldWrapper"
                >
                  <div
                    class="flex flex-row-reverse items-center"
                  >
                    <div
                      class="flex items-center h-7 ml-2"
                    >
                      <label
                        class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                      >
                        Propietario de negocios
                      </label>
                      <div
                        class="relative"
                        data-headlessui-state=""
                      >
                        <div
                          aria-expanded="false"
                          data-headlessui-state=""
                          id="headlessui-popover-button-:r2:"
                        >
                          <button
                            class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
                          >
                            <svg
                              class="h-5 w-5"
                              height="1em"
                              viewBox="0 0 32 32"
                              width="1em"
                            >
                              <path
                                d="M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm0 4c-2.2 0-4 1.8-4 4h2c0-1.117.883-2 2-2s2 .883 2 2a1.78 1.78 0 01-1.219 1.688l-.406.124A2.02 2.02 0 0015 17.72V19h2v-1.281l.406-.125A3.807 3.807 0 0020 14c0-2.2-1.8-4-4-4zm-1 10v2h2v-2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"
                      />
                    </div>
                    <input
                      class="block w-5 h-5 rounded-md"
                      name="canCreateBusiness"
                      type="checkbox"
                      value="false"
                    />
                  </div>
                  <span
                    class="text-red-500 text-xs"
                  />
                </div>
              </div>
              <div
                class="w-fit mt-6"
                data-id="FormFieldWrapper"
              >
                <div
                  class="flex flex-row-reverse items-center"
                >
                  <div
                    class="flex items-center h-7 ml-2"
                  >
                    <label
                      class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                    >
                      Acepto los
                       
                      <button
                        class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit !inline-block"
                      >
                        Términos y Condiciones
                      </button>
                    </label>
                  </div>
                  <input
                    class="block w-5 h-5 rounded-md"
                    name="termsAndConditionsAccepted"
                    type="checkbox"
                    value="false"
                  />
                </div>
                <span
                  class="text-red-500 text-xs"
                />
              </div>
              <div
                class="w-100 text-sm flex pt-4"
              >
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `);
  });
});
