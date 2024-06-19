import { render } from '@testing-library/react';

import { IconButtonDetails } from '.';

describe('IconButtonDetails', () => {
  it('render', async () => {
    const result = render(<IconButtonDetails />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Ver detalles"
        >
          <svg
            class="h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M6 3v26h20V9.594l-.281-.313-6-6L19.406 3zm2 2h10v6h6v16H8zm12 1.438L22.563 9H20zM11 13v2h10v-2zm0 4v2h10v-2zm0 4v2h10v-2z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
