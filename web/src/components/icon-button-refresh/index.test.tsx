import { render } from '@testing-library/react';

import { IconButtonRefresh } from '.';

describe('IconButtonRefresh', () => {
  it('render', async () => {
    const result = render(<IconButtonRefresh />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Actualizar"
        >
          <svg
            class="!fill-gray-500 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 4c-5.113 0-9.383 3.16-11.125 7.625l1.844.75C8.176 8.641 11.71 6 16 6c3.242 0 6.133 1.59 7.938 4H20v2h7V5h-2v3.094A11.938 11.938 0 0016 4zm9.281 15.625C23.824 23.359 20.29 26 16 26c-3.277 0-6.156-1.613-7.969-4H12v-2H5v7h2v-3.094C9.188 26.386 12.395 28 16 28c5.113 0 9.383-3.16 11.125-7.625z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
