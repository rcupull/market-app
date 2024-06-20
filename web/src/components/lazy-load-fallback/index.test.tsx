import { render } from '@testing-library/react';

import { LazyLoadFallback } from '.';

describe('LazyLoadFallback', () => {
  it('render', async () => {
    const result = render(<LazyLoadFallback />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex justify-center items-center fixed inset-0 z-50"
        >
          <div>
            <div
              class="rcs-ellipsis"
              style="--rcs-ellipsis-color: rgba(0,0,0, 0.5);"
            >
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
