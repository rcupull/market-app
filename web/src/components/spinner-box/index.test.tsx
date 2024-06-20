import { render } from '@testing-library/react';

import { SpinnerBox } from '.';

describe('SpinnerBox', () => {
  it('render', async () => {
    const result = render(<SpinnerBox />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="bg-white opacity-50 cursor-not-allowed absolute inset-0 flex items-center justify-center"
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
