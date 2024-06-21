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
                  Diseño
                </label>
              </div>
              <div
                class="relative flex flex-col sm:flex-row sm:items-center sm:gap-4"
                id="headlessui-radiogroup-:r0:"
                role="radiogroup"
              >
                <div
                  aria-checked="true"
                  data-headlessui-state="checked"
                  id="headlessui-radiogroup-option-:r1:"
                  role="radio"
                  tabindex="0"
                >
                  <div
                    class="relative"
                  >
                    <div
                      class="w-fit"
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
                            Ninguno
                          </label>
                        </div>
                        <input
                          checked=""
                          class="block w-5 h-5 rounded-md"
                          type="checkbox"
                        />
                      </div>
                      <span
                        class="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div
                  aria-checked="false"
                  data-headlessui-state=""
                  id="headlessui-radiogroup-option-:r2:"
                  role="radio"
                  tabindex="-1"
                >
                  <div
                    class="relative"
                  >
                    <div
                      class="w-fit"
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
                            Estático
                          </label>
                        </div>
                        <input
                          class="block w-5 h-5 rounded-md"
                          type="checkbox"
                        />
                      </div>
                      <span
                        class="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div
                  aria-checked="false"
                  data-headlessui-state=""
                  id="headlessui-radiogroup-option-:r3:"
                  role="radio"
                  tabindex="-1"
                >
                  <div
                    class="relative"
                  >
                    <div
                      class="w-fit"
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
                            Deslizante
                          </label>
                        </div>
                        <input
                          class="block w-5 h-5 rounded-md"
                          type="checkbox"
                        />
                      </div>
                      <span
                        class="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
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
                  Imágenes
                </label>
              </div>
              <div
                class="flex items-center justify-start gap-2 mb-1"
              >
                <div
                  class="h-8 w-10 cursor-pointer border-gray-700 border-2 rounded-md p-0.5"
                >
                  <div
                    class="relative h-full w-full text-gray-500"
                  >
                    <svg
                      class="fill-gray-300 h-full w-full"
                      height="1em"
                      viewBox="0 0 32 32"
                      width="1em"
                    >
                      <path
                        d="M2 5v22h28V5zm2 2h24v13.906l-5.281-5.312-.719-.719-4.531 4.531-5.75-5.812-.719-.719-7 7zm20 2a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-13 6.719L20.188 25H4v-2.281zm11 2l6 6V25h-4.969l-4.156-4.188z"
                      />
                    </svg>
                    <svg
                      class="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold"
                      height="1em"
                      viewBox="0 0 32 32"
                      width="1em"
                    >
                      <path
                        d="M15 5v10H5v2h10v10h2V17h10v-2H17V5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="relative h-48"
              >
                <div
                  class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 sm:px-6 py-10"
                >
                  <div
                    class="no-preflight text-center"
                  >
                    <svg
                      class="fill-gray-300 mx-auto h-12 w-12 text-gray-300"
                      height="1em"
                      viewBox="0 0 32 32"
                      width="1em"
                    >
                      <path
                        d="M2 5v22h28V5zm2 2h24v13.906l-5.281-5.312-.719-.719-4.531 4.531-5.75-5.812-.719-.719-7 7zm20 2a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-13 6.719L20.188 25H4v-2.281zm11 2l6 6V25h-4.969l-4.156-4.188z"
                      />
                    </svg>
                    <ol
                      class="mt-4 text-sm leading-6 text-gray-600"
                    >
                      <li>
                        <label
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          for="bannerImages"
                        >
                          <span>
                            Seleccione imagen en su galería
                          </span>
                          <input
                            accept="image/*"
                            class="sr-only"
                            name="bannerImages"
                            type="file"
                            value=""
                          />
                        </label>
                      </li>
                      <li>
                        <span
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          Nuestros catálogos.
                        </span>
                      </li>
                    </ol>
                    <p
                      class="text-xs leading-5 text-gray-600"
                    >
                      PNG, JPG, GIF hasta 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span
              class="text-red-500 text-xs"
            />
          </div>
        </form>
      </div>
    `);
  });
});
