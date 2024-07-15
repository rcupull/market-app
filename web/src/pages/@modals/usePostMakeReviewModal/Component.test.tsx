import { render } from '@testing-library/react';

import { Component } from './Component';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(
      <Component portal={portalDummy} onAfterSuccess={jest.fn()} postId="postId" />,
      {
        wrapper: getWrapper({ useModal: true, useRouter: true }),
      }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <form
          class="mt-10"
        >
          <div
            class=""
            data-id="FormFieldWrapper"
          >
            <div
              class=""
            >
              <div
                class="flex items-center h-7 mb-2"
              >
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                >
                  Review
                </label>
              </div>
              <div
                class="flex items-center"
              >
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
              class="text-red-500 text-xs"
            />
          </div>
          <div
            class="mt-6"
            data-id="FormFieldWrapper"
          >
            <div
              class=""
            >
              <div
                class="flex items-center h-7 mb-2"
              >
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                >
                  Comentario
                </label>
              </div>
              <textarea
                class="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="comment"
              />
            </div>
            <span
              class="text-red-500 text-xs"
            />
          </div>
        </form>
      </div>
    `);
  });
});
