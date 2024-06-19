import { render } from '@testing-library/react';

import { CheckEditor } from '.';

describe('CheckEditor', () => {
  it('render', async () => {
    const result = render(<CheckEditor />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="no-preflight"
        >
          <div />
        </div>
      </div>
    `);
  });
});
