import { render } from '@testing-library/react';

import { IconButtonAdd } from '.';

describe('IconButtonAdd', () => {
  it('render', async () => {
    const result = render(<IconButtonAdd />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Nuevo"
        >
          <svg
            class="h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
