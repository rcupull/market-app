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
      },
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex min-h-full flex-col justify-center"
        >
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
      </div>
    `);
  });
});
