import { render } from '@testing-library/react';

import { Component } from './Component';

import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            aria-orientation="horizontal"
            class="flex gap-1 overflow-auto"
            role="tablist"
          >
            <div
              aria-controls="headlessui-tabs-panel-:r6:"
              aria-selected="true"
              class="cursor-pointer focus-visible:outline-none cursor-default flex-grow flex justify-start"
              data-headlessui-state="selected"
              data-selected=""
              id="headlessui-tabs-tab-:r0:"
              role="tab"
              tabindex="0"
            >
              <div
                class="flex items-center"
              >
                <div
                  class="border-2 border-gray-400 rounded-full w-8 h-8 flex items-center justify-center font-semibold !border-indigo-500 !bg-indigo-500 !text-white"
                >
                  1
                </div>
                <div
                  class="text-center font-semibold ml-4"
                >
                  Productos
                </div>
              </div>
            </div>
            <div
              aria-controls="headlessui-tabs-panel-:r8:"
              aria-selected="false"
              class="cursor-pointer focus-visible:outline-none cursor-default"
              data-headlessui-state=""
              id="headlessui-tabs-tab-:r2:"
              role="tab"
              tabindex="-1"
            >
              <div
                class="flex items-center"
              >
                <div
                  class="border-2 border-gray-400 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  2
                </div>
              </div>
            </div>
            <div
              aria-controls="headlessui-tabs-panel-:ra:"
              aria-selected="false"
              class="cursor-pointer focus-visible:outline-none cursor-default"
              data-headlessui-state=""
              id="headlessui-tabs-tab-:r4:"
              role="tab"
              tabindex="-1"
            >
              <div
                class="flex items-center"
              >
                <div
                  class="border-2 border-gray-400 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  3
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              aria-labelledby="headlessui-tabs-tab-:r0:"
              class="pt-4 w-full mt-8"
              data-headlessui-state="selected"
              data-selected=""
              id="headlessui-tabs-panel-:r6:"
              role="tabpanel"
              tabindex="0"
            >
              <div
                class="font-semibold"
              >
                No tiene productos en la bolsa
              </div>
            </div>
            <span
              aria-hidden="true"
              aria-labelledby="headlessui-tabs-tab-:r2:"
              id="headlessui-tabs-panel-:r8:"
              role="tabpanel"
              style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"
              tabindex="-1"
            />
            <span
              aria-hidden="true"
              aria-labelledby="headlessui-tabs-tab-:r4:"
              id="headlessui-tabs-panel-:ra:"
              role="tabpanel"
              style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"
              tabindex="-1"
            />
          </div>
        </div>
      </div>
    `);
  });
});
