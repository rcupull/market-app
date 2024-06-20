import { render } from '@testing-library/react';

import { IconButtonRemove } from '.';

describe('IconButtonRemove', () => {
  it('render', async () => {
    const result = render(<IconButtonRemove />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Eliminar"
        >
          <svg
            class="!fill-red-600 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M15 4c-.523 0-1.059.184-1.438.563C13.184 4.94 13 5.476 13 6v1H7v2h1v16c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V9h1V7h-6V6c0-.523-.184-1.059-.563-1.438C20.06 4.184 19.523 4 19 4zm0 2h4v1h-4zm-5 3h14v16c0 .555-.445 1-1 1H11c-.555 0-1-.445-1-1zm2 3v11h2V12zm4 0v11h2V12zm4 0v11h2V12z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
