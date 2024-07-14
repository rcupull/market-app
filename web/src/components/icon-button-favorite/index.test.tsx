import { render } from '@testing-library/react';

import { IconButtonFavorite } from '.';

describe('IconButtonFavorite', () => {
  it('render', async () => {
    const result = render(<IconButtonFavorite />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Favorito"
        >
          <svg
            class="fill-red-500 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M9.5 5C5.363 5 2 8.402 2 12.5c0 1.43.648 2.668 1.25 3.563a9.25 9.25 0 001.219 1.468L15.28 28.375l.719.719.719-.719L27.53 17.531S30 15.355 30 12.5C30 8.402 26.637 5 22.5 5c-3.434 0-5.645 2.066-6.5 2.938C15.145 7.066 12.934 5 9.5 5zm0 2c2.988 0 5.75 2.906 5.75 2.906l.75.844.75-.844S19.512 7 22.5 7c3.043 0 5.5 2.496 5.5 5.5 0 1.543-1.875 3.625-1.875 3.625L16 26.25 5.875 16.125s-.484-.465-.969-1.188C4.422 14.216 4 13.274 4 12.5 4 9.496 6.457 7 9.5 7z"
            />
          </svg>
        </button>
      </div>
    `);
  });

  it('render fill', async () => {
    const result = render(<IconButtonFavorite fill />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
          title="Favorito"
        >
          <svg
            class="fill-red-500 h-5 w-5"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M22.5 5c-2.892 0-5.327 1.804-6.5 2.854C14.827 6.804 12.392 5 9.5 5 5.364 5 2 8.364 2 12.5c0 2.59 2.365 4.947 2.46 5.041L16 29.081l11.534-11.534C27.635 17.447 30 15.09 30 12.5 30 8.364 26.636 5 22.5 5z"
            />
          </svg>
        </button>
      </div>
    `);
  });
});
