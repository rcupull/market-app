import { render } from '@testing-library/react';

import { IconButtonOptionsBars } from '.';

describe('IconButtonOptionsBars', () => {
  it('render', async () => {
    const result = render(<IconButtonOptionsBars />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Opciones"
        >
          <svg
            class="h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M4 7v2h24V7zm0 8v2h24v-2zm0 8v2h24v-2z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
