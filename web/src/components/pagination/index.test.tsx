import { render } from '@testing-library/react';

import { Pagination } from '.';

describe('Pagination', () => {
  it('render', async () => {
    const result = render(<Pagination />);

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
