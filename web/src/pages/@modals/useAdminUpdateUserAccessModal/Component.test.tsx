import { render } from '@testing-library/react';

import { Component } from './Component';

import { dummiPortal, userDummy } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(
      <Component
        portal={dummiPortal}
        user={userDummy}
        onAfterSuccess={jest.fn()}
        allSpecialAccess={[]}
      />,
      {
        wrapper: getWrapper({ useModal: true, useRouter: true }),
      },
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <form
          class="w-full"
        >
          <div
            class=""
            data-id="FormFieldWrapper"
          >
            <div
              class=""
            >
              <div
                class="flex items-center h-7 mb-2"
              >
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                >
                  Imágenes
                </label>
              </div>
              <div
                class="flex items-center flex-wrap gap-4"
              />
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
