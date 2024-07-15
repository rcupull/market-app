import { render } from '@testing-library/react';

import { SideBar } from '.';

import { getWrapper } from 'utils/test-utils';

describe('SideBar', () => {
  it('render', async () => {
    const result = render(
      <SideBar
        items={[
          {
            endElement: <div />,
            label: 'Label',
            content: <div />,
            divider: true,
          },
        ]}
      />,
      { wrapper: getWrapper({ useRouter: true }) }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex flex-col items-center w-full h-full overflow-hidden text-gray-700 bg-gray-100 pb-3  border-r-2 border-gray-300"
          data-id="SideBar"
        >
          <div
            class="w-full mt-8 mb-4 border-t-2 border-gray-300 !mt-3 !mb-1"
          />
        </div>
      </div>
    `);
  });
});
