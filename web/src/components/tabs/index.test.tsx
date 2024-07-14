import { render } from '@testing-library/react';

import { Tabs } from '.';

describe('Tabs', () => {
  it('render', async () => {
    const result = render(
      <Tabs
        items={[
          {
            label: 'Tab 1',
            content: <div>Tab 1</div>,
          },
          {
            label: 'Tab 2',
            content: <div>Tab 2</div>,
          },
        ]}
      />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            aria-orientation="horizontal"
            class="flex gap-1 overflow-auto"
            role="tablist"
          >
            <div
              aria-controls="headlessui-tabs-panel-:r4:"
              aria-selected="true"
              class="cursor-pointer focus-visible:outline-none"
              data-headlessui-state="selected"
              data-selected=""
              id="headlessui-tabs-tab-:r0:"
              role="tab"
              tabindex="0"
            >
              <div
                class="w-full text-center p-2 bg-gray-50 rounded-sm hover:bg-gray-100 border-b-2 border-transparent text-nowrap flex items-center gap-2 !border-indigo-600"
              >
                Tab 1
              </div>
            </div>
            <div
              aria-controls="headlessui-tabs-panel-:r6:"
              aria-selected="false"
              class="cursor-pointer focus-visible:outline-none"
              data-headlessui-state=""
              id="headlessui-tabs-tab-:r2:"
              role="tab"
              tabindex="-1"
            >
              <div
                class="w-full text-center p-2 bg-gray-50 rounded-sm hover:bg-gray-100 border-b-2 border-transparent text-nowrap flex items-center gap-2"
              >
                Tab 2
              </div>
            </div>
          </div>
          <div>
            <div
              aria-labelledby="headlessui-tabs-tab-:r0:"
              class="pt-4"
              data-headlessui-state="selected"
              data-selected=""
              id="headlessui-tabs-panel-:r4:"
              role="tabpanel"
              tabindex="0"
            >
              <div>
                Tab 1
              </div>
            </div>
            <span
              aria-hidden="true"
              aria-labelledby="headlessui-tabs-tab-:r2:"
              id="headlessui-tabs-panel-:r6:"
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
