import { render } from '@testing-library/react';

import { IconButtonMoveUp } from '.';

describe('IconButtonMoveUp', () => {
  it('render', async () => {
    const result = render(<IconButtonMoveUp />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Mover hacia arriba"
        >
          <svg
            class="h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3.594l-.719.687-7 7L9.72 12.72 15 7.438V24h2V7.437l5.281 5.282 1.438-1.438-7-7zM7 26v2h18v-2z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
