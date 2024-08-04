import { render } from '@testing-library/react';

import { BusinessCardSimple } from '.';

import { getWrapper } from 'utils/test-utils';

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
          salesAmount: 0
        }}
      />,
      { wrapper: getWrapper({ useRouter: true, useRedux: true }) }
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <a
          class="group size-full"
          data-id="BusinessCardSimple"
          href="/href"
        >
          <div
            class="relative overflow-hidden border border-gray-300 rounded-lg flex flex-col items-center justify-between size-full"
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
              class="my-4 text-lg text-gray-500 font-bold"
            >
              name
            </h3>
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none !absolute right-0 bottom-0"
              title="Favorito"
            >
              <svg
                class="fill-red-500 h-5 w-5"
                height="1em"
                viewBox="0 0 32 32"
                width="1em"
              >
                <path
                  d="M9.5 5C5.363 5 2 8.402 2 12.5c0 1.43.648 2.668 1.25 3.563a9.25 9.25 0 001.219 1.468L15.28 28.375l.719.719.719-.719L27.53 17.531S30 15.355 30 12.5C30 8.402 26.637 5 22.5 5c-3.434 0-5.645 2.066-6.5 2.938C15.145 7.066 12.934 5 9.5 5zm0 2c2.988 0 5.75 2.906 5.75 2.906l.75.844.75-.844S19.512 7 22.5 7c3.043 0 5.5 2.496 5.5 5.5 0 1.543-1.875 3.625-1.875 3.625L16 26.25 5.875 16.125s-.484-.465-.969-1.188C4.422 14.216 4 13.274 4 12.5 4 9.496 6.457 7 9.5 7z"
                />
              </svg>
            </button>
          </div>
        </a>
      </div>
    `);
  });
});
