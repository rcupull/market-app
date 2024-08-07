import { render } from '@testing-library/react';

import { Divider } from '.';

describe('Divider', () => {
  it('render', async () => {
    const result = render(<Divider />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full border-t-2 border-gray-300 mt-8 mb-4"
        />
      </div>
    `);
  });
});
