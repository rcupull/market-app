import { render } from '@testing-library/react';

import { BannerInfoTotalDebitBusiness } from '.';

import { dummyStatus } from 'constants/api';
import { businessDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('BannerInfoTotalDebitBusiness', () => {
  it('render', async () => {
    const result = render(<BannerInfoTotalDebitBusiness />, {
      wrapper: getWrapper({
        useRedux: true,
        useRouter: true,
        initialReduxState: { useBusiness: { data: businessDummy, status: dummyStatus } },
      }),
    });

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
