import { render } from '@testing-library/react';

import { Review } from '.';

describe('Amount', () => {
  it('render', async () => {
    const result = render(<Review value={[3, 4, 5, 6, 7]} />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <h3
            class="sr-only"
          >
            Reviews
          </h3>
          <div
            class="flex items-center"
          >
            <div
              class="flex items-center"
            >
              <div
                class="flex items-center"
              >
                <div>
                  <svg
                    aria-hidden="true"
                    class="fill-yellow-400 h-5 w-5 flex-shrink-0"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M30.336 12.547l-10.172-1.074L16 2.133l-4.164 9.34-10.172 1.074 7.598 6.848L7.14 29.398 16 24.29l8.86 5.11-2.122-10.004z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    class="fill-yellow-400 h-5 w-5 flex-shrink-0"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M30.336 12.547l-10.172-1.074L16 2.133l-4.164 9.34-10.172 1.074 7.598 6.848L7.14 29.398 16 24.29l8.86 5.11-2.122-10.004z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    class="fill-yellow-400 h-5 w-5 flex-shrink-0"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M30.336 12.547l-10.172-1.074L16 2.133l-4.164 9.34-10.172 1.074 7.598 6.848L7.14 29.398 16 24.29l8.86 5.11-2.122-10.004z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    class="fill-yellow-400 h-5 w-5 flex-shrink-0"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M30.336 12.547l-10.172-1.074L16 2.133l-4.164 9.34-10.172 1.074 7.598 6.848L7.14 29.398 16 24.29l8.86 5.11-2.122-10.004z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    class="fill-gray-200 h-5 w-5 flex-shrink-0"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M30.336 12.547l-10.172-1.074L16 2.133l-4.164 9.34-10.172 1.074 7.598 6.848L7.14 29.398 16 24.29l8.86 5.11-2.122-10.004z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <span
              class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              25 votos
            </span>
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-indigo-600 text-white fill-white hover:bg-indigo-500 hover:bg-indigo-500 ml-2 !py-0"
            >
              Votar
            </button>
          </div>
        </div>
      </div>
    `);
  });
});
