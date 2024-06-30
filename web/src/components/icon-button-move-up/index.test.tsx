import { render } from '@testing-library/react';

import { IconButtonMoveUp } from '.';

describe('IconButtonMoveUp', () => {
  it('render', async () => {
    const result = render(<IconButtonMoveUp />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Editar"
        >
          <svg
            class="!fill-blue-700 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M24.688 4.031c-.836 0-1.649.336-2.282.969l-.093.094-.625-.594L5.188 21l-.063.313-1.094 5.5-.312 1.468 1.469-.312 5.5-1.094.312-.063 16.5-16.5-.594-.593.063-.063.031-.062A3.254 3.254 0 0027 5a3.288 3.288 0 00-2.313-.969zm0 1.969c.312 0 .64.14.906.406.535.535.535 1.246 0 1.782l-.094.093L23.719 6.5l.093-.094c.266-.265.563-.406.875-.406zm-2.97 1.313l2.97 2.968-1.438 1.469-3-3zm-2.843 2.875l2.938 2.937-10.438 10.469-.406-1.813-.125-.625-.625-.125-1.813-.406zM6.969 22.343l2.187.5.5 2.187-2.031.407-1.063-1.063z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
