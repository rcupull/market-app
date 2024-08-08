import { render } from '@testing-library/react';

import { RadioGroup } from '.';

describe('RadioGroup', () => {
  it('render', async () => {
    const result = render(
      <RadioGroup items={[]} optionToValue={() => ''} renderOption={() => <div />} />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="relative"
          id="headlessui-radiogroup-:r0:"
          role="radiogroup"
        />
      </div>
    `);
  });
});
