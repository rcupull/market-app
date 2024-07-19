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
        <form
          class="w-full"
        >
          <div
            class="mt-6"
            data-id="FormFieldWrapper"
          >
            <div
              class=""
            >
              <div
                class="no-preflight check-editor-max-h-65vh"
              >
                <div />
              </div>
            </div>
            <span
              class="text-red-500 text-xs"
            />
          </div>
        </form>
      </div>
    `);
  });
});
