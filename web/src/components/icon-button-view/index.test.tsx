import { render } from '@testing-library/react';

import { IconButtonView } from '.';

describe('IconButtonView', () => {
  it('render', async () => {
    const result = render(<IconButtonView />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Ver la página"
        >
          <svg
            class="!fill-gray-700 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M18 5v2h5.563L11.28 19.281l1.438 1.438L25 8.437V14h2V5zM5 9v18h18V14l-2 2v9H7V11h9l2-2z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
