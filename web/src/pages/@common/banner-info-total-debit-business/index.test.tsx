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

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex items-center ring-1 ring-gray-400 rounded-2xl py-0.5 px-2"
        >
          <span
            class="font-bold"
          >
            <span
              class="text-nowrap"
            >
              Débito
            </span>
            :
          </span>
          <span>
            <span
              class="text-nowrap"
            >
               0 CUP
            </span>
          </span>
        </div>
      </div>
    `);
  });
});
