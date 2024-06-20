import { render } from '@testing-library/react';

import { MutedBox } from '.';

describe('MutedBox', () => {
  it('render', async () => {
    const result = render(<MutedBox />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full h-24 border-2 bg-gray-200 rounded-md"
        />
      </div>
    `);
  });
});
