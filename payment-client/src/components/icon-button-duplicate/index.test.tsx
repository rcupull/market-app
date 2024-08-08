import { render } from '@testing-library/react';

import { IconButtonDuplicate } from '.';

describe('IconButtonDuplicate', () => {
  it('render', async () => {
    const result = render(<IconButtonDuplicate />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Duplicar"
        >
          <svg
            class="!fill-green-800 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M4 4v20h7v-2H6V6h12v1h2V4zm8 4v20h16V8zm2 2h12v16H14z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
