import { render } from '@testing-library/react';

import { HtmlTextContainer } from '.';

describe('HtmlTextContainer', () => {
  it('render', async () => {
    const result = render(<HtmlTextContainer />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="no-preflight"
        />
      </div>
    `);
  });
});
