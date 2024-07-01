import { render } from '@testing-library/react';

import { NavBar } from '.';

import { getWrapper } from 'utils/test-utils';

describe('NavBar', () => {
  it('render', async () => {
    const result = render(
      <NavBar
        items={[
          {
            name: 'name1',
            href: '/href1',
          },
          {
            name: 'name2',
            href: '/href2',
          },
        ]}
      />,
      { wrapper: getWrapper({ useRouter: true }) }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full px-2 sm:px-8 bg-white flex shadow-lg items-center justify-center h-16 gap-6"
          data-id="NavBar"
        >
          <div
            class="space-x-4 hidden sm:flex flex-1"
          >
            <a
              class="text-gray-700 hover:bg-gray-200 hover:text-gray-600 rounded-md px-3 py-2 text-sm font-medium text-nowrap"
              href="/href1"
            >
              name1
            </a>
            <a
              class="text-gray-700 hover:bg-gray-200 hover:text-gray-600 rounded-md px-3 py-2 text-sm font-medium text-nowrap"
              href="/href2"
            >
              name2
            </a>
          </div>
        </div>
      </div>
    `);
  });
});
