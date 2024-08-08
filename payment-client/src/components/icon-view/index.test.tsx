import { render } from '@testing-library/react';

import { IconView } from '.';

describe('IconView', () => {
  it('render', async () => {
    const result = render(<IconView />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <svg
          class="!fill-gray-700"
          height="1em"
          viewBox="0 0 32 32"
          width="1em"
        >
          <path
            d="M18 5v2h5.563L11.28 19.281l1.438 1.438L25 8.437V14h2V5zM5 9v18h18V14l-2 2v9H7V11h9l2-2z"
          />
        </svg>
      </div>
    `);
  });
});
