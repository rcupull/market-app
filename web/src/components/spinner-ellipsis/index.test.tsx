import { render } from '@testing-library/react';

import { SpinnerEllipsis } from '.';

describe('SpinnerEllipsis', () => {
  it('render', async () => {
    const result = render(<SpinnerEllipsis />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
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
    `);
  });
});
