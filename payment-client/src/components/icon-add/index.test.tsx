import { render } from '@testing-library/react';

import { IconAdd } from '.';

describe('IconAdd', () => {
  it('render', async () => {
    const result = render(<IconAdd />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <svg
          class="fill-blue-700"
          height="1em"
          viewBox="0 0 32 32"
          width="1em"
        >
          <path
            d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z"
          />
        </svg>
      </div>
    `);
  });
});
