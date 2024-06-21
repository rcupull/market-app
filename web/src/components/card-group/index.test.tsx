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
            class="grid  place-items-center"
          >
            <div />
             
            <div />
          </div>
        </div>
      </div>
    `);
  });
});
