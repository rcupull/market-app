import { render } from '@testing-library/react';

import { ClothingProductGrid1 } from '.';

describe('ClothingProductGrid1', () => {
  it('render', async () => {
    const result = render(<ClothingProductGrid1 currency="CUP" render={{}} />);

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
