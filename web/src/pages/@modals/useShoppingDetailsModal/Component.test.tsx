import { render } from '@testing-library/react';

import { Component } from './Component';

import { shoppingDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component shopping={shoppingDummy} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full p-3"
        >
          <div
            class="flex items-center gap-1"
          >
            <div
              class="flex items-center gap-1"
            >
              <span>
                Estado:
              </span>
              <span
                class="font-bold text-gray-300"
              >
                En construcción
              </span>
            </div>
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
              title="Ver el historial de la orden de compra"
            >
              <svg
                class="h-5 w-5"
                height="1em"
                viewBox="0 0 32 32"
                width="1em"
              >
                <path
                  d="M16 4A11.989 11.989 0 006 9.344V6H4v7h7v-2H7.375C9.102 8.02 12.297 6 16 6c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16H4c0 6.617 5.383 12 12 12s12-5.383 12-12S22.617 4 16 4zm-1 4v9h7v-2h-5V8z"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex flex-col gap-2 mt-2"
          >
            <div
              class="bg-gray-100 rounded-lg border-2 border-gray-200  p-2"
            >
              <div
                class="flex flex-col sm:flex-row gap-2 items-center justify-between  rounded-md"
              >
                <div
                  class="flex items-center gap-2 "
                >
                  <div
                    class="flex-shrink-0"
                  >
                    <svg
                      class="fill-gray-300 size-8"
                      height="1em"
                      viewBox="0 0 32 32"
                      width="1em"
                    >
                      <path
                        d="M2 5v22h28V5zm2 2h24v13.906l-5.281-5.312-.719-.719-4.531 4.531-5.75-5.812-.719-.719-7 7zm20 2a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-13 6.719L20.188 25H4v-2.281zm11 2l6 6V25h-4.969l-4.156-4.188z"
                      />
                    </svg>
                  </div>
                  <span
                    class="text-wrap max-w-48 flex-grow"
                  >
                    Chancletas de palo
                  </span>
                </div>
                <div
                  class="flex gap-2"
                >
                  <span>
                    4 unidades
                  </span>
                  <span>
                    50 USD
                  </span>
                </div>
              </div>
            </div>
            <div
              class="flex justify-center sm:justify-end"
            >
              <div
                class="flex flex-col sm:flex-row gap-2 border-2 border-gray-400 rounded-xl p-2"
              >
                <div
                  class="flex items-center"
                >
                  <span
                    class="font-bold"
                  >
                    Total
                    :
                  </span>
                  <span>
                     4 unidades
                  </span>
                </div>
                <div
                  class="flex items-center"
                >
                  <span
                    class="font-bold"
                  >
                    Precio
                    :
                  </span>
                  <span>
                     200 USD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
