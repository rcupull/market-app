import { render } from '@testing-library/react';

import { EmptyImage } from '.';

describe('EmptyImage', () => {
  it('render', async () => {
    const result = render(<EmptyImage />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <svg
          class="fill-gray-300"
          height="1em"
          viewBox="0 0 32 32"
          width="1em"
        >
          <path
            d="M2 5v22h28V5zm2 2h24v13.906l-5.281-5.312-.719-.719-4.531 4.531-5.75-5.812-.719-.719-7 7zm20 2a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-13 6.719L20.188 25H4v-2.281zm11 2l6 6V25h-4.969l-4.156-4.188z"
          />
        </svg>
      </div>
    `);
  });
});
