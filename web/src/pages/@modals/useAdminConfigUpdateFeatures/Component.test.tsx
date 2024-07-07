import { render } from '@testing-library/react';

import { Component } from './Component';

import { portalDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component portal={portalDummy} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="p-4"
        >
          <div
            class="flex justify-end"
          >
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-indigo-600 text-white fill-white hover:bg-indigo-500 hover:bg-indigo-500"
            >
              Añadir feature
            </button>
          </div>
        </div>
      </div>
    `);
  });
});
