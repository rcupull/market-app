import { render } from '@testing-library/react';

import { ComponentLink } from './ComponentLink';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('ComponentLink', () => {
  it('render', async () => {
    const result = render(<ComponentLink portal={portalDummy} onAfterSuccess={jest.fn()} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
