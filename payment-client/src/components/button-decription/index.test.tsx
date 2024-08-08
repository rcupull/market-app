import { render } from '@testing-library/react';

import { ButtonDescription } from '.';

describe('ButtonDescription', () => {
  it('render', async () => {
    const result = render(<ButtonDescription description="description" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
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
      </div>
    `);
  });
});
