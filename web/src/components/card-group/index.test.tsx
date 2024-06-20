import { render } from '@testing-library/react';

import { CardGroup } from '.';

describe('CardGroup', () => {
  it('render', async () => {
    const result = render(
      <CardGroup>
        <div /> <div />
      </CardGroup>,
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class=""
          data-id="CardGroup"
        >
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center"
          >
            <div />
             
            <div />
          </div>
        </div>
      </div>
    `);
  });
});
