import { render } from '@testing-library/react';

import { BusinessCardSimple } from '.';

import { getWrapper } from 'utils/test-utils';

describe('BusinessCardSimple', () => {
  it('render', async () => {
    const result = render(
      <BusinessCardSimple
        href="/href"
        businessSummary={{
          bestDiscount: 0,
          _id: '_id',
          name: 'name',
          images: [],
          routeName: 'routeName',
          salesAmount: 0
        }}
      />,
      { wrapper: getWrapper({ useRouter: true, useRedux: true }) }
    );

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
