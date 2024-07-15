import { render } from '@testing-library/react';

import { Pagination } from '.';

describe('Pagination', () => {
  it('render', async () => {
    const result = render(
      <Pagination
        paginator={{
          dataCount: 0,
          offset: 0,
          limit: 0,
          pageCount: 0,
          page: 0,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
        }}
      />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
          <div
            class="flex flex-1 justify-between sm:hidden"
          >
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 cursor-not-allowed !bg-gray-300"
            >
              Anterior
            </button>
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 cursor-not-allowed !bg-gray-300"
            >
              Siguiente
            </button>
          </div>
          <div
            class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
          >
            <div>
              <p
                class="text-sm text-gray-700"
              >
                <span
                  class="font-medium"
                >
                  Mostrando 1 - 0 de 0
                </span>
              </p>
            </div>
            <div>
              <nav
                aria-label="Pagination"
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 cursor-not-allowed !bg-gray-300 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-l-md"
                >
                  <svg
                    class="h-5 w-5"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M19.031 4.281l-11 11-.687.719.687.719 11 11 1.438-1.438L10.187 16 20.47 5.719z"
                    />
                  </svg>
                </button>
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  1
                </button>
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </button>
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  3
                </button>
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  4
                </button>
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  5
                </button>
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 cursor-not-allowed !bg-gray-300 w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-r-md"
                >
                  <svg
                    class="h-5 w-5"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M12.969 4.281L11.53 5.72 21.812 16l-10.28 10.281 1.437 1.438 11-11 .687-.719-.687-.719z"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
