import { render } from '@testing-library/react';

import { DateTimePickerCollapsable } from '.';

describe('DateTimePickerCollapsable', () => {
  it('render', async () => {
    const result = render(<DateTimePickerCollapsable />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="relative"
          data-headlessui-state=""
          data-id="Menu"
        >
          <div
            class="relative"
          >
            <div
              aria-expanded="false"
              aria-haspopup="menu"
              class="cursor-pointer w-fit"
              data-headlessui-state=""
              id="headlessui-menu-button-:r2:"
            >
              <span
                class="rdrDateInput block w-fit rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                <input
                  value=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
