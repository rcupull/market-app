import { render } from '@testing-library/react';

import { IconButtonLocation } from '.';

describe('IconButtonLocation', () => {
  it('render', async () => {
    const result = render(<IconButtonLocation />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Ubicación"
        >
          <svg
            class="fill-indigo-600 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3c-4.957 0-9 4.043-9 9 0 1.406.57 3.02 1.344 4.781.773 1.762 1.77 3.633 2.781 5.375a101.333 101.333 0 004.063 6.407L16 29.75l.813-1.188s2.039-2.917 4.062-6.406c1.012-1.742 2.008-3.613 2.781-5.375C24.43 15.02 25 13.406 25 12c0-4.957-4.043-9-9-9zm0 2c3.879 0 7 3.121 7 7 0 .8-.43 2.316-1.156 3.969-.727 1.652-1.73 3.484-2.719 5.187-1.57 2.711-2.547 4.145-3.125 5-.578-.855-1.555-2.289-3.125-5-.988-1.703-1.992-3.535-2.719-5.187C9.43 14.316 9 12.8 9 12c0-3.879 3.121-7 7-7zm0 5a1.999 1.999 0 100 4 1.999 1.999 0 100-4z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
