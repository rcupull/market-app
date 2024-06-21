import { render } from '@testing-library/react';

import { Component } from './Component';

import { dummiPortal } from 'utils/test-dummies';
import { getWrapper } from 'utils/test-utils';

describe('Component', () => {
  it('render', async () => {
    const result = render(<Component portal={dummiPortal} />, {
      wrapper: getWrapper({ useModal: true, useRouter: true }),
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex min-h-full flex-col justify-center"
        >
          <div
            class="sm:mx-auto sm:w-full sm:max-w-sm"
          >
            <div
              class="flex justify-center"
            >
              <div
                class="px-2 py-0.5 rounded-full bg-white h-14 !size-28"
              >
                <img
                  alt="Market Logo"
                  class="h-full"
                  src="/logo.png"
                />
              </div>
            </div>
            <h2
              class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Enviar código de verificación
            </h2>
          </div>
          <div
            class="mt-10"
          >
            <form>
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
                      Correo electrónico *
                    </label>
                  </div>
                  <div
                    class="relative h-9"
                  >
                    <input
                      class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
                      id="email"
                      name="email"
                      type="email"
                      value=""
                    />
                  </div>
                </div>
                <span
                  class="text-red-500 text-xs"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    `);
  });
});
