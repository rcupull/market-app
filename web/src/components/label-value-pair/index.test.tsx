import { render } from '@testing-library/react';

import { LabelValuePair } from '.';

describe('LabelValuePair', () => {
  it('render', async () => {
    const result = render(<LabelValuePair label="Label" value="Value" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex items-center"
        >
          <span
            class="font-bold"
          >
            Label
            :
          </span>
          <span>
            Value
          </span>
        </div>
      </div>
    `);
  });
});
