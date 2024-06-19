import { render } from '@testing-library/react';

import { Amount } from '.';

describe('Amount', () => {
  it('render', async () => {
    const result = render(<Amount />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="relative flex items-center gap-1"
        >
          <button
            class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !p-1 !ring-1"
          >
            <svg
              class="h-5 w-5 !size-3"
              height="1em"
              viewBox="0 0 32 32"
              width="1em"
            >
              <path
                d="M19.031 4.281l-11 11-.687.719.687.719 11 11 1.438-1.438L10.187 16 20.47 5.719z"
              />
            </svg>
          </button>
          <div
            class="relative h-9 !w-12 !h-6 !text-center"
          >
            <input
              class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
              value="0"
            />
          </div>
          <button
            class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !p-1 !ring-1"
          >
            <svg
              class="h-5 w-5 !size-3"
              height="1em"
              viewBox="0 0 32 32"
              width="1em"
            >
              <path
                d="M12.969 4.281L11.53 5.72 21.812 16l-10.28 10.281 1.437 1.438 11-11 .687-.719-.687-.719z"
              />
            </svg>
          </button>
        </div>
      </div>
    `);
  });
});
