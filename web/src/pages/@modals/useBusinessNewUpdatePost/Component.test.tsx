import { render } from '@testing-library/react';

import { Component } from './Component';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render product', async () => {
    const result = render(
      <Component portal={portalDummy} onAfterSuccess={jest.fn()} postType="product" />,
      {
        wrapper: getWrapper({ useModal: true, useRouter: true }),
      },
    );

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('render link', async () => {
    const result = render(
      <Component portal={portalDummy} onAfterSuccess={jest.fn()} postType="link" />,
      {
        wrapper: getWrapper({ useModal: true, useRouter: true }),
      },
    );

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
