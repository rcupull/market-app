import { render } from '@testing-library/react';

import { ReviewAverage } from '.';

describe('ReviewAverage', () => {
  it('render', async () => {
    const result = render(<ReviewAverage value={9} />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
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
        </div>
      </div>
    `);
  });
});
