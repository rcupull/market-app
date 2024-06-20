import { render } from '@testing-library/react';

import { PricePlanCard } from '.';

describe('PricePlanCard', () => {
  it('render', async () => {
    const result = render(
      <PricePlanCard
        description="description"
        name="name"
        price={25}
        items={[
          {
            description: '5 products',
            included: true,
          },
        ]}
      />,
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-96 rounded-2xl bg-gray-50 py-8 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center"
        >
          <div
            class="mx-auto max-w-sm px-8"
          >
            <div
              class="w-full flex justify-between items-center text-xl font-bold text-indigo-600"
            >
              <h2>
                name
              </h2>
            </div>
            <p
              class="text- text-gray-600 mt-3 text-start h-24"
            >
              description
            </p>
            <p
              class="mt-6 flex items-baseline gap-x-2"
            >
              <span
                class="text-3xl font-bold tracking-tight text-gray-900"
              >
                25
              </span>
              <span
                class="text-sm font-semibold leading-6 tracking-wide text-gray-600"
              >
                CUP/mensual
              </span>
            </p>
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 mt-6 w-full text-indigo-600 ring-indigo-600"
            >
              Contratar
            </button>
            <div
              class="mt-6"
            >
              <div
                class="flex items-center mt-2"
              >
                <svg
                  class="h-5 w-5 fill-indigo-700"
                  height="1em"
                  viewBox="0 0 32 32"
                  width="1em"
                >
                  <path
                    d="M28.281 6.281L11 23.563 3.719 16.28 2.28 17.72l8 8 .719.687.719-.687 18-18z"
                  />
                </svg>
                <span
                  class="text-sm leading-6 text-gray-900 ml-2"
                >
                  5 products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
