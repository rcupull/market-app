import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { BreadCrumble } from '.';

describe('BreadCrumble', () => {
  it('render', async () => {
    const result = render(
      <BreadCrumble
        items={[
          { label: 'test', route: '/test' },
          { label: 'test2', route: '/test2' },
        ]}
      />,
      { wrapper: BrowserRouter }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="no-preflight flex items-center gap-1"
        >
          <div
            class="flex items-center gap-2"
          >
            <a
              class="text-md italic"
              href="/test"
            >
              test
            </a>
          </div>
          <div
            class="flex items-center gap-2"
          >
            <span
              class="font-semibold text-gray-500"
            >
              &gt;
            </span>
            <a
              class="text-md italic"
              href="/test2"
            >
              test2
            </a>
          </div>
        </div>
      </div>
    `);
  });
});
