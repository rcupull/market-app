import { render } from '@testing-library/react';

import { BackButton } from '.';

import { getWrapper } from 'utils/test-utils';

describe('BackButton', () => {
  it('render', async () => {
    const result = render(<BackButton />, { wrapper: getWrapper({ useRouter: true }) });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none ring-0"
        >
          <svg
            class="h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M13.281 6.781l-8.5 8.5-.687.719.687.719 8.5 8.5 1.438-1.438L7.938 17H28v-2H7.937l6.782-6.781z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
