import { render } from '@testing-library/react';

import { IconDuplicate } from '.';

describe('IconDuplicate', () => {
  it('render', async () => {
    const result = render(<IconDuplicate />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <svg
          class="!fill-green-800"
          height="1em"
          viewBox="0 0 32 32"
          width="1em"
        >
          <path
            d="M4 4v20h7v-2H6V6h12v1h2V4zm8 4v20h16V8zm2 2h12v16H14z"
          />
        </svg>
      </div>
    `);
  });
});
