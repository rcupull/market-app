import { render } from '@testing-library/react';

import { HeroSectionCentered } from '.';

import { getWrapper } from 'utils/test-utils';

describe('HeroSectionCentered', () => {
  it('render', async () => {
    const result = render(<HeroSectionCentered />, {
      wrapper: getWrapper({ useRouter: true, useRedux: true })
    });

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
