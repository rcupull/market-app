import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { BusinessCardSimple } from '.';

describe('BusinessCardSimple', () => {
  it('render', async () => {
    const result = render(
      <BusinessCardSimple
        href="/href"
        businessSummary={{
          bestDiscount: 0,
          _id: '_id',
          name: 'name',
          images: [],
          routeName: 'routeName',
          salesAmount: 0,
        }}
      />,
      { wrapper: BrowserRouter }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <a
          class="group size-full"
          data-id="BusinessCardSimple"
          href="/href"
        >
          <div
            class="overflow-hidden border border-gray-300 rounded-lg flex flex-col items-center justify-between size-full"
          >
            <div
              class="w-full p-2"
            >
              <div
                class="flex items-center justify-center size-full"
              >
                <svg
                  class="fill-gray-300 size-full"
                  height="1em"
                  viewBox="0 0 32 32"
                  width="1em"
                >
                  <path
                    d="M2 5v22h28V5zm2 2h24v13.906l-5.281-5.312-.719-.719-4.531 4.531-5.75-5.812-.719-.719-7 7zm20 2a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-13 6.719L20.188 25H4v-2.281zm11 2l6 6V25h-4.969l-4.156-4.188z"
                  />
                </svg>
              </div>
            </div>
            <h3
              class="mt-4 text-lg text-gray-700"
            >
              name
            </h3>
          </div>
        </a>
      </div>
    `);
  });
});
