import { render } from '@testing-library/react';

import { Input } from '.';

describe('Input', () => {
  it('render', async () => {
    const result = render(<Input />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="relative h-9"
        >
          <input
            class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    `);
  });
});
