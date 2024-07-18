import { render } from '@testing-library/react';

import { ComponentProduct } from './ComponentProduct';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('ComponentProduct', () => {
  it('render', async () => {
    const result = render(<ComponentProduct portal={portalDummy} onAfterSuccess={jest.fn()} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
