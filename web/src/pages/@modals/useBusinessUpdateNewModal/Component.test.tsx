import { render } from '@testing-library/react';

import { Component } from './Component';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component portal={portalDummy} onAfterSuccess={jest.fn()} />, {
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
                  <span
                    class="flex flex-col sm:flex-row items-start sm:items-center"
                  >
                    Nombre del negocio *
                    <span
                      class="text-red-600 text-xs sm:ml-2"
                    >
                      (Este valor 
                      <span
                        class="font-bold"
                      >
                        NO
                      </span>
                       se puede modificar una vez creado)
                    </span>
                  </span>
                </label>
              </div>
              <div
                class="relative h-9"
              >
                <input
                  autocomplete="business-name"
                  class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  id="business-name"
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
            class="mt-3"
          />
          <div
            class="mt-6 w-full"
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
                  Moneda
                </label>
              </div>
              <div
                class="relative"
              >
                <div
                  class="relative"
                >
                  <button
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    class="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    data-headlessui-state=""
                    id="headlessui-listbox-button-:r2:"
                    name="currency"
                    type="button"
                  >
                    <div
                      class="flex items-center h-6"
                    >
                      CUP
                    </div>
                    <span
                      class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-5 w-5 fill-gray-400"
                        height="1em"
                        viewBox="0 0 32 32"
                        width="1em"
                      >
                        <path
                          d="M3.594 12l1.687 1.719 10 10 .719.687.719-.687 10-10L28.406 12zm4.844 2h15.124L16 21.563z"
                        />
                      </svg>
                    </span>
                  </button>
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
                  Categorías *
                </label>
              </div>
              <div
                class="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4"
              >
                <div
                  class="absolute inset-0 bg-white opacity-55 flex items-center justify-center"
                >
                  <div>
                    <div
                      class="rcs-ellipsis"
                      style="--rcs-ellipsis-color: rgba(0,0,0, 0.5);"
                    >
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
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
