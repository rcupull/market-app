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
        <div>
          Nuestra plataforma utiliza Telegram para mantenerlo actualizado del estado de sus negocios, órdenes de compra y otras informaciones importantes.
          <div
            class="w-full mt-8 mb-4 border-t-2 border-gray-300"
          />
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
                    Recibir notificaciones:
                  </label>
                </div>
                <div
                  class="flex items-center flex-wrap gap-4"
                >
                  <div
                    class="relative"
                  >
                    <div
                      class="w-fit"
                      data-id="FormFieldWrapper"
                    >
                      <div
                        class="flex flex-row-reverse items-center"
                      >
                        <div
                          class="flex items-center h-7 ml-2"
                        >
                          <label
                            class="block text-sm font-semibold leading-6 text-gray-900  w-fit"
                          >
                            Al crear orden de compra
                          </label>
                          <div
                            class="relative"
                            data-headlessui-state=""
                          >
                            <div
                              aria-expanded="false"
                              data-headlessui-state=""
                              id="headlessui-popover-button-:r2:"
                            >
                              <button
                                class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none"
                              >
                                <svg
                                  class="h-5 w-5"
                                  height="1em"
                                  viewBox="0 0 32 32"
                                  width="1em"
                                >
                                  <path
                                    d="M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm0 4c-2.2 0-4 1.8-4 4h2c0-1.117.883-2 2-2s2 .883 2 2a1.78 1.78 0 01-1.219 1.688l-.406.124A2.02 2.02 0 0015 17.72V19h2v-1.281l.406-.125A3.807 3.807 0 0020 14c0-2.2-1.8-4-4-4zm-1 10v2h2v-2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div
                            style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"
                          />
                        </div>
                        <input
                          class="block w-5 h-5 rounded-md"
                          type="checkbox"
                        />
                      </div>
                      <span
                        class="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span
                class="text-red-500 text-xs"
              />
            </div>
          </form>
          <div
            class="w-full mt-8 mb-4 border-t-2 border-gray-300"
          />
          <div
            class="no-preflight"
          >
            <ol
              class="mt-4 text-left"
            >
              <li>
                De click en el enlace o escanee el QR siguiente.
                <div
                  class="flex flex-col items-center gap-4 mt-4"
                >
                  <a
                    href="https://t.me/AsereMarketDevBot"
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://t.me/AsereMarketDevBot
                  </a>
                  <svg
                    class="size-40"
                    height="256"
                    viewBox="0 0 25 25"
                    width="256"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="       M 7 0 l 1 0 0 1 -1 0 Z   M 10 0 l 1 0 0 1 -1 0 Z M 11 0 l 1 0 0 1 -1 0 Z M 12 0 l 1 0 0 1 -1 0 Z   M 15 0 l 1 0 0 1 -1 0 Z M 16 0 l 1 0 0 1 -1 0 Z M 17 0 l 1 0 0 1 -1 0 Z         M 1 1 l 1 0 0 1 -1 0 Z M 2 1 l 1 0 0 1 -1 0 Z M 3 1 l 1 0 0 1 -1 0 Z M 4 1 l 1 0 0 1 -1 0 Z M 5 1 l 1 0 0 1 -1 0 Z  M 7 1 l 1 0 0 1 -1 0 Z M 8 1 l 1 0 0 1 -1 0 Z M 9 1 l 1 0 0 1 -1 0 Z  M 11 1 l 1 0 0 1 -1 0 Z M 12 1 l 1 0 0 1 -1 0 Z  M 14 1 l 1 0 0 1 -1 0 Z M 15 1 l 1 0 0 1 -1 0 Z M 16 1 l 1 0 0 1 -1 0 Z M 17 1 l 1 0 0 1 -1 0 Z  M 19 1 l 1 0 0 1 -1 0 Z M 20 1 l 1 0 0 1 -1 0 Z M 21 1 l 1 0 0 1 -1 0 Z M 22 1 l 1 0 0 1 -1 0 Z M 23 1 l 1 0 0 1 -1 0 Z   M 1 2 l 1 0 0 1 -1 0 Z    M 5 2 l 1 0 0 1 -1 0 Z  M 7 2 l 1 0 0 1 -1 0 Z M 8 2 l 1 0 0 1 -1 0 Z    M 12 2 l 1 0 0 1 -1 0 Z   M 15 2 l 1 0 0 1 -1 0 Z  M 17 2 l 1 0 0 1 -1 0 Z  M 19 2 l 1 0 0 1 -1 0 Z    M 23 2 l 1 0 0 1 -1 0 Z   M 1 3 l 1 0 0 1 -1 0 Z    M 5 3 l 1 0 0 1 -1 0 Z  M 7 3 l 1 0 0 1 -1 0 Z M 8 3 l 1 0 0 1 -1 0 Z M 9 3 l 1 0 0 1 -1 0 Z    M 13 3 l 1 0 0 1 -1 0 Z M 14 3 l 1 0 0 1 -1 0 Z M 15 3 l 1 0 0 1 -1 0 Z M 16 3 l 1 0 0 1 -1 0 Z M 17 3 l 1 0 0 1 -1 0 Z  M 19 3 l 1 0 0 1 -1 0 Z    M 23 3 l 1 0 0 1 -1 0 Z   M 1 4 l 1 0 0 1 -1 0 Z    M 5 4 l 1 0 0 1 -1 0 Z  M 7 4 l 1 0 0 1 -1 0 Z M 8 4 l 1 0 0 1 -1 0 Z M 9 4 l 1 0 0 1 -1 0 Z M 10 4 l 1 0 0 1 -1 0 Z M 11 4 l 1 0 0 1 -1 0 Z M 12 4 l 1 0 0 1 -1 0 Z   M 15 4 l 1 0 0 1 -1 0 Z  M 17 4 l 1 0 0 1 -1 0 Z  M 19 4 l 1 0 0 1 -1 0 Z    M 23 4 l 1 0 0 1 -1 0 Z   M 1 5 l 1 0 0 1 -1 0 Z M 2 5 l 1 0 0 1 -1 0 Z M 3 5 l 1 0 0 1 -1 0 Z M 4 5 l 1 0 0 1 -1 0 Z M 5 5 l 1 0 0 1 -1 0 Z  M 7 5 l 1 0 0 1 -1 0 Z M 8 5 l 1 0 0 1 -1 0 Z  M 10 5 l 1 0 0 1 -1 0 Z   M 13 5 l 1 0 0 1 -1 0 Z  M 15 5 l 1 0 0 1 -1 0 Z M 16 5 l 1 0 0 1 -1 0 Z M 17 5 l 1 0 0 1 -1 0 Z  M 19 5 l 1 0 0 1 -1 0 Z M 20 5 l 1 0 0 1 -1 0 Z M 21 5 l 1 0 0 1 -1 0 Z M 22 5 l 1 0 0 1 -1 0 Z M 23 5 l 1 0 0 1 -1 0 Z         M 7 6 l 1 0 0 1 -1 0 Z  M 9 6 l 1 0 0 1 -1 0 Z  M 11 6 l 1 0 0 1 -1 0 Z  M 13 6 l 1 0 0 1 -1 0 Z  M 15 6 l 1 0 0 1 -1 0 Z  M 17 6 l 1 0 0 1 -1 0 Z        M 0 7 l 1 0 0 1 -1 0 Z M 1 7 l 1 0 0 1 -1 0 Z M 2 7 l 1 0 0 1 -1 0 Z M 3 7 l 1 0 0 1 -1 0 Z M 4 7 l 1 0 0 1 -1 0 Z M 5 7 l 1 0 0 1 -1 0 Z M 6 7 l 1 0 0 1 -1 0 Z M 7 7 l 1 0 0 1 -1 0 Z   M 10 7 l 1 0 0 1 -1 0 Z    M 14 7 l 1 0 0 1 -1 0 Z M 15 7 l 1 0 0 1 -1 0 Z  M 17 7 l 1 0 0 1 -1 0 Z M 18 7 l 1 0 0 1 -1 0 Z M 19 7 l 1 0 0 1 -1 0 Z M 20 7 l 1 0 0 1 -1 0 Z M 21 7 l 1 0 0 1 -1 0 Z M 22 7 l 1 0 0 1 -1 0 Z M 23 7 l 1 0 0 1 -1 0 Z M 24 7 l 1 0 0 1 -1 0 Z   M 2 8 l 1 0 0 1 -1 0 Z   M 5 8 l 1 0 0 1 -1 0 Z  M 7 8 l 1 0 0 1 -1 0 Z M 8 8 l 1 0 0 1 -1 0 Z  M 10 8 l 1 0 0 1 -1 0 Z M 11 8 l 1 0 0 1 -1 0 Z  M 13 8 l 1 0 0 1 -1 0 Z    M 17 8 l 1 0 0 1 -1 0 Z  M 19 8 l 1 0 0 1 -1 0 Z M 20 8 l 1 0 0 1 -1 0 Z M 21 8 l 1 0 0 1 -1 0 Z M 22 8 l 1 0 0 1 -1 0 Z M 23 8 l 1 0 0 1 -1 0 Z  M 0 9 l 1 0 0 1 -1 0 Z    M 4 9 l 1 0 0 1 -1 0 Z  M 6 9 l 1 0 0 1 -1 0 Z  M 8 9 l 1 0 0 1 -1 0 Z M 9 9 l 1 0 0 1 -1 0 Z  M 11 9 l 1 0 0 1 -1 0 Z M 12 9 l 1 0 0 1 -1 0 Z M 13 9 l 1 0 0 1 -1 0 Z   M 16 9 l 1 0 0 1 -1 0 Z M 17 9 l 1 0 0 1 -1 0 Z M 18 9 l 1 0 0 1 -1 0 Z M 19 9 l 1 0 0 1 -1 0 Z     M 24 9 l 1 0 0 1 -1 0 Z  M 1 10 l 1 0 0 1 -1 0 Z M 2 10 l 1 0 0 1 -1 0 Z M 3 10 l 1 0 0 1 -1 0 Z     M 8 10 l 1 0 0 1 -1 0 Z  M 10 10 l 1 0 0 1 -1 0 Z   M 13 10 l 1 0 0 1 -1 0 Z    M 17 10 l 1 0 0 1 -1 0 Z M 18 10 l 1 0 0 1 -1 0 Z M 19 10 l 1 0 0 1 -1 0 Z   M 22 10 l 1 0 0 1 -1 0 Z M 23 10 l 1 0 0 1 -1 0 Z   M 1 11 l 1 0 0 1 -1 0 Z    M 5 11 l 1 0 0 1 -1 0 Z M 6 11 l 1 0 0 1 -1 0 Z  M 8 11 l 1 0 0 1 -1 0 Z M 9 11 l 1 0 0 1 -1 0 Z M 10 11 l 1 0 0 1 -1 0 Z M 11 11 l 1 0 0 1 -1 0 Z M 12 11 l 1 0 0 1 -1 0 Z M 13 11 l 1 0 0 1 -1 0 Z     M 18 11 l 1 0 0 1 -1 0 Z  M 20 11 l 1 0 0 1 -1 0 Z     M 0 12 l 1 0 0 1 -1 0 Z    M 4 12 l 1 0 0 1 -1 0 Z   M 7 12 l 1 0 0 1 -1 0 Z M 8 12 l 1 0 0 1 -1 0 Z    M 12 12 l 1 0 0 1 -1 0 Z M 13 12 l 1 0 0 1 -1 0 Z M 14 12 l 1 0 0 1 -1 0 Z  M 16 12 l 1 0 0 1 -1 0 Z M 17 12 l 1 0 0 1 -1 0 Z  M 19 12 l 1 0 0 1 -1 0 Z M 20 12 l 1 0 0 1 -1 0 Z M 21 12 l 1 0 0 1 -1 0 Z M 22 12 l 1 0 0 1 -1 0 Z M 23 12 l 1 0 0 1 -1 0 Z   M 1 13 l 1 0 0 1 -1 0 Z M 2 13 l 1 0 0 1 -1 0 Z M 3 13 l 1 0 0 1 -1 0 Z   M 6 13 l 1 0 0 1 -1 0 Z M 7 13 l 1 0 0 1 -1 0 Z  M 9 13 l 1 0 0 1 -1 0 Z   M 12 13 l 1 0 0 1 -1 0 Z  M 14 13 l 1 0 0 1 -1 0 Z   M 17 13 l 1 0 0 1 -1 0 Z M 18 13 l 1 0 0 1 -1 0 Z M 19 13 l 1 0 0 1 -1 0 Z  M 21 13 l 1 0 0 1 -1 0 Z M 22 13 l 1 0 0 1 -1 0 Z  M 24 13 l 1 0 0 1 -1 0 Z   M 2 14 l 1 0 0 1 -1 0 Z M 3 14 l 1 0 0 1 -1 0 Z    M 7 14 l 1 0 0 1 -1 0 Z M 8 14 l 1 0 0 1 -1 0 Z M 9 14 l 1 0 0 1 -1 0 Z  M 11 14 l 1 0 0 1 -1 0 Z M 12 14 l 1 0 0 1 -1 0 Z M 13 14 l 1 0 0 1 -1 0 Z M 14 14 l 1 0 0 1 -1 0 Z  M 16 14 l 1 0 0 1 -1 0 Z  M 18 14 l 1 0 0 1 -1 0 Z M 19 14 l 1 0 0 1 -1 0 Z       M 1 15 l 1 0 0 1 -1 0 Z   M 4 15 l 1 0 0 1 -1 0 Z  M 6 15 l 1 0 0 1 -1 0 Z M 7 15 l 1 0 0 1 -1 0 Z  M 9 15 l 1 0 0 1 -1 0 Z M 10 15 l 1 0 0 1 -1 0 Z M 11 15 l 1 0 0 1 -1 0 Z M 12 15 l 1 0 0 1 -1 0 Z M 13 15 l 1 0 0 1 -1 0 Z  M 15 15 l 1 0 0 1 -1 0 Z     M 20 15 l 1 0 0 1 -1 0 Z   M 23 15 l 1 0 0 1 -1 0 Z   M 1 16 l 1 0 0 1 -1 0 Z M 2 16 l 1 0 0 1 -1 0 Z   M 5 16 l 1 0 0 1 -1 0 Z     M 10 16 l 1 0 0 1 -1 0 Z    M 14 16 l 1 0 0 1 -1 0 Z       M 21 16 l 1 0 0 1 -1 0 Z   M 24 16 l 1 0 0 1 -1 0 Z M 0 17 l 1 0 0 1 -1 0 Z M 1 17 l 1 0 0 1 -1 0 Z M 2 17 l 1 0 0 1 -1 0 Z M 3 17 l 1 0 0 1 -1 0 Z M 4 17 l 1 0 0 1 -1 0 Z M 5 17 l 1 0 0 1 -1 0 Z M 6 17 l 1 0 0 1 -1 0 Z M 7 17 l 1 0 0 1 -1 0 Z  M 9 17 l 1 0 0 1 -1 0 Z M 10 17 l 1 0 0 1 -1 0 Z M 11 17 l 1 0 0 1 -1 0 Z M 12 17 l 1 0 0 1 -1 0 Z  M 14 17 l 1 0 0 1 -1 0 Z M 15 17 l 1 0 0 1 -1 0 Z  M 17 17 l 1 0 0 1 -1 0 Z M 18 17 l 1 0 0 1 -1 0 Z M 19 17 l 1 0 0 1 -1 0 Z  M 21 17 l 1 0 0 1 -1 0 Z   M 24 17 l 1 0 0 1 -1 0 Z        M 7 18 l 1 0 0 1 -1 0 Z M 8 18 l 1 0 0 1 -1 0 Z  M 10 18 l 1 0 0 1 -1 0 Z   M 13 18 l 1 0 0 1 -1 0 Z    M 17 18 l 1 0 0 1 -1 0 Z  M 19 18 l 1 0 0 1 -1 0 Z  M 21 18 l 1 0 0 1 -1 0 Z M 22 18 l 1 0 0 1 -1 0 Z M 23 18 l 1 0 0 1 -1 0 Z   M 1 19 l 1 0 0 1 -1 0 Z M 2 19 l 1 0 0 1 -1 0 Z M 3 19 l 1 0 0 1 -1 0 Z M 4 19 l 1 0 0 1 -1 0 Z M 5 19 l 1 0 0 1 -1 0 Z  M 7 19 l 1 0 0 1 -1 0 Z M 8 19 l 1 0 0 1 -1 0 Z  M 10 19 l 1 0 0 1 -1 0 Z M 11 19 l 1 0 0 1 -1 0 Z M 12 19 l 1 0 0 1 -1 0 Z  M 14 19 l 1 0 0 1 -1 0 Z   M 17 19 l 1 0 0 1 -1 0 Z M 18 19 l 1 0 0 1 -1 0 Z M 19 19 l 1 0 0 1 -1 0 Z  M 21 19 l 1 0 0 1 -1 0 Z M 22 19 l 1 0 0 1 -1 0 Z M 23 19 l 1 0 0 1 -1 0 Z M 24 19 l 1 0 0 1 -1 0 Z  M 1 20 l 1 0 0 1 -1 0 Z    M 5 20 l 1 0 0 1 -1 0 Z  M 7 20 l 1 0 0 1 -1 0 Z    M 11 20 l 1 0 0 1 -1 0 Z  M 13 20 l 1 0 0 1 -1 0 Z        M 21 20 l 1 0 0 1 -1 0 Z M 22 20 l 1 0 0 1 -1 0 Z  M 24 20 l 1 0 0 1 -1 0 Z  M 1 21 l 1 0 0 1 -1 0 Z    M 5 21 l 1 0 0 1 -1 0 Z  M 7 21 l 1 0 0 1 -1 0 Z  M 9 21 l 1 0 0 1 -1 0 Z  M 11 21 l 1 0 0 1 -1 0 Z M 12 21 l 1 0 0 1 -1 0 Z M 13 21 l 1 0 0 1 -1 0 Z   M 16 21 l 1 0 0 1 -1 0 Z   M 19 21 l 1 0 0 1 -1 0 Z M 20 21 l 1 0 0 1 -1 0 Z M 21 21 l 1 0 0 1 -1 0 Z M 22 21 l 1 0 0 1 -1 0 Z    M 1 22 l 1 0 0 1 -1 0 Z    M 5 22 l 1 0 0 1 -1 0 Z  M 7 22 l 1 0 0 1 -1 0 Z M 8 22 l 1 0 0 1 -1 0 Z M 9 22 l 1 0 0 1 -1 0 Z M 10 22 l 1 0 0 1 -1 0 Z   M 13 22 l 1 0 0 1 -1 0 Z M 14 22 l 1 0 0 1 -1 0 Z M 15 22 l 1 0 0 1 -1 0 Z   M 18 22 l 1 0 0 1 -1 0 Z M 19 22 l 1 0 0 1 -1 0 Z       M 1 23 l 1 0 0 1 -1 0 Z M 2 23 l 1 0 0 1 -1 0 Z M 3 23 l 1 0 0 1 -1 0 Z M 4 23 l 1 0 0 1 -1 0 Z M 5 23 l 1 0 0 1 -1 0 Z  M 7 23 l 1 0 0 1 -1 0 Z  M 9 23 l 1 0 0 1 -1 0 Z M 10 23 l 1 0 0 1 -1 0 Z  M 12 23 l 1 0 0 1 -1 0 Z M 13 23 l 1 0 0 1 -1 0 Z  M 15 23 l 1 0 0 1 -1 0 Z M 16 23 l 1 0 0 1 -1 0 Z M 17 23 l 1 0 0 1 -1 0 Z    M 21 23 l 1 0 0 1 -1 0 Z           M 7 24 l 1 0 0 1 -1 0 Z   M 10 24 l 1 0 0 1 -1 0 Z  M 12 24 l 1 0 0 1 -1 0 Z M 13 24 l 1 0 0 1 -1 0 Z M 14 24 l 1 0 0 1 -1 0 Z   M 17 24 l 1 0 0 1 -1 0 Z  M 19 24 l 1 0 0 1 -1 0 Z M 20 24 l 1 0 0 1 -1 0 Z  M 22 24 l 1 0 0 1 -1 0 Z M 23 24 l 1 0 0 1 -1 0 Z "
                      fill="#FFFFFF"
                    />
                    <path
                      d="M 0 0 l 1 0 0 1 -1 0 Z M 1 0 l 1 0 0 1 -1 0 Z M 2 0 l 1 0 0 1 -1 0 Z M 3 0 l 1 0 0 1 -1 0 Z M 4 0 l 1 0 0 1 -1 0 Z M 5 0 l 1 0 0 1 -1 0 Z M 6 0 l 1 0 0 1 -1 0 Z  M 8 0 l 1 0 0 1 -1 0 Z M 9 0 l 1 0 0 1 -1 0 Z    M 13 0 l 1 0 0 1 -1 0 Z M 14 0 l 1 0 0 1 -1 0 Z    M 18 0 l 1 0 0 1 -1 0 Z M 19 0 l 1 0 0 1 -1 0 Z M 20 0 l 1 0 0 1 -1 0 Z M 21 0 l 1 0 0 1 -1 0 Z M 22 0 l 1 0 0 1 -1 0 Z M 23 0 l 1 0 0 1 -1 0 Z M 24 0 l 1 0 0 1 -1 0 Z M 0 1 l 1 0 0 1 -1 0 Z      M 6 1 l 1 0 0 1 -1 0 Z    M 10 1 l 1 0 0 1 -1 0 Z   M 13 1 l 1 0 0 1 -1 0 Z     M 18 1 l 1 0 0 1 -1 0 Z      M 24 1 l 1 0 0 1 -1 0 Z M 0 2 l 1 0 0 1 -1 0 Z  M 2 2 l 1 0 0 1 -1 0 Z M 3 2 l 1 0 0 1 -1 0 Z M 4 2 l 1 0 0 1 -1 0 Z  M 6 2 l 1 0 0 1 -1 0 Z   M 9 2 l 1 0 0 1 -1 0 Z M 10 2 l 1 0 0 1 -1 0 Z M 11 2 l 1 0 0 1 -1 0 Z  M 13 2 l 1 0 0 1 -1 0 Z M 14 2 l 1 0 0 1 -1 0 Z  M 16 2 l 1 0 0 1 -1 0 Z  M 18 2 l 1 0 0 1 -1 0 Z  M 20 2 l 1 0 0 1 -1 0 Z M 21 2 l 1 0 0 1 -1 0 Z M 22 2 l 1 0 0 1 -1 0 Z  M 24 2 l 1 0 0 1 -1 0 Z M 0 3 l 1 0 0 1 -1 0 Z  M 2 3 l 1 0 0 1 -1 0 Z M 3 3 l 1 0 0 1 -1 0 Z M 4 3 l 1 0 0 1 -1 0 Z  M 6 3 l 1 0 0 1 -1 0 Z    M 10 3 l 1 0 0 1 -1 0 Z M 11 3 l 1 0 0 1 -1 0 Z M 12 3 l 1 0 0 1 -1 0 Z      M 18 3 l 1 0 0 1 -1 0 Z  M 20 3 l 1 0 0 1 -1 0 Z M 21 3 l 1 0 0 1 -1 0 Z M 22 3 l 1 0 0 1 -1 0 Z  M 24 3 l 1 0 0 1 -1 0 Z M 0 4 l 1 0 0 1 -1 0 Z  M 2 4 l 1 0 0 1 -1 0 Z M 3 4 l 1 0 0 1 -1 0 Z M 4 4 l 1 0 0 1 -1 0 Z  M 6 4 l 1 0 0 1 -1 0 Z       M 13 4 l 1 0 0 1 -1 0 Z M 14 4 l 1 0 0 1 -1 0 Z  M 16 4 l 1 0 0 1 -1 0 Z  M 18 4 l 1 0 0 1 -1 0 Z  M 20 4 l 1 0 0 1 -1 0 Z M 21 4 l 1 0 0 1 -1 0 Z M 22 4 l 1 0 0 1 -1 0 Z  M 24 4 l 1 0 0 1 -1 0 Z M 0 5 l 1 0 0 1 -1 0 Z      M 6 5 l 1 0 0 1 -1 0 Z   M 9 5 l 1 0 0 1 -1 0 Z  M 11 5 l 1 0 0 1 -1 0 Z M 12 5 l 1 0 0 1 -1 0 Z  M 14 5 l 1 0 0 1 -1 0 Z    M 18 5 l 1 0 0 1 -1 0 Z      M 24 5 l 1 0 0 1 -1 0 Z M 0 6 l 1 0 0 1 -1 0 Z M 1 6 l 1 0 0 1 -1 0 Z M 2 6 l 1 0 0 1 -1 0 Z M 3 6 l 1 0 0 1 -1 0 Z M 4 6 l 1 0 0 1 -1 0 Z M 5 6 l 1 0 0 1 -1 0 Z M 6 6 l 1 0 0 1 -1 0 Z  M 8 6 l 1 0 0 1 -1 0 Z  M 10 6 l 1 0 0 1 -1 0 Z  M 12 6 l 1 0 0 1 -1 0 Z  M 14 6 l 1 0 0 1 -1 0 Z  M 16 6 l 1 0 0 1 -1 0 Z  M 18 6 l 1 0 0 1 -1 0 Z M 19 6 l 1 0 0 1 -1 0 Z M 20 6 l 1 0 0 1 -1 0 Z M 21 6 l 1 0 0 1 -1 0 Z M 22 6 l 1 0 0 1 -1 0 Z M 23 6 l 1 0 0 1 -1 0 Z M 24 6 l 1 0 0 1 -1 0 Z         M 8 7 l 1 0 0 1 -1 0 Z M 9 7 l 1 0 0 1 -1 0 Z  M 11 7 l 1 0 0 1 -1 0 Z M 12 7 l 1 0 0 1 -1 0 Z M 13 7 l 1 0 0 1 -1 0 Z   M 16 7 l 1 0 0 1 -1 0 Z         M 0 8 l 1 0 0 1 -1 0 Z M 1 8 l 1 0 0 1 -1 0 Z  M 3 8 l 1 0 0 1 -1 0 Z M 4 8 l 1 0 0 1 -1 0 Z  M 6 8 l 1 0 0 1 -1 0 Z   M 9 8 l 1 0 0 1 -1 0 Z   M 12 8 l 1 0 0 1 -1 0 Z  M 14 8 l 1 0 0 1 -1 0 Z M 15 8 l 1 0 0 1 -1 0 Z M 16 8 l 1 0 0 1 -1 0 Z  M 18 8 l 1 0 0 1 -1 0 Z      M 24 8 l 1 0 0 1 -1 0 Z  M 1 9 l 1 0 0 1 -1 0 Z M 2 9 l 1 0 0 1 -1 0 Z M 3 9 l 1 0 0 1 -1 0 Z  M 5 9 l 1 0 0 1 -1 0 Z  M 7 9 l 1 0 0 1 -1 0 Z   M 10 9 l 1 0 0 1 -1 0 Z    M 14 9 l 1 0 0 1 -1 0 Z M 15 9 l 1 0 0 1 -1 0 Z     M 20 9 l 1 0 0 1 -1 0 Z M 21 9 l 1 0 0 1 -1 0 Z M 22 9 l 1 0 0 1 -1 0 Z M 23 9 l 1 0 0 1 -1 0 Z  M 0 10 l 1 0 0 1 -1 0 Z    M 4 10 l 1 0 0 1 -1 0 Z M 5 10 l 1 0 0 1 -1 0 Z M 6 10 l 1 0 0 1 -1 0 Z M 7 10 l 1 0 0 1 -1 0 Z  M 9 10 l 1 0 0 1 -1 0 Z  M 11 10 l 1 0 0 1 -1 0 Z M 12 10 l 1 0 0 1 -1 0 Z  M 14 10 l 1 0 0 1 -1 0 Z M 15 10 l 1 0 0 1 -1 0 Z M 16 10 l 1 0 0 1 -1 0 Z    M 20 10 l 1 0 0 1 -1 0 Z M 21 10 l 1 0 0 1 -1 0 Z   M 24 10 l 1 0 0 1 -1 0 Z M 0 11 l 1 0 0 1 -1 0 Z  M 2 11 l 1 0 0 1 -1 0 Z M 3 11 l 1 0 0 1 -1 0 Z M 4 11 l 1 0 0 1 -1 0 Z   M 7 11 l 1 0 0 1 -1 0 Z       M 14 11 l 1 0 0 1 -1 0 Z M 15 11 l 1 0 0 1 -1 0 Z M 16 11 l 1 0 0 1 -1 0 Z M 17 11 l 1 0 0 1 -1 0 Z  M 19 11 l 1 0 0 1 -1 0 Z  M 21 11 l 1 0 0 1 -1 0 Z M 22 11 l 1 0 0 1 -1 0 Z M 23 11 l 1 0 0 1 -1 0 Z M 24 11 l 1 0 0 1 -1 0 Z  M 1 12 l 1 0 0 1 -1 0 Z M 2 12 l 1 0 0 1 -1 0 Z M 3 12 l 1 0 0 1 -1 0 Z  M 5 12 l 1 0 0 1 -1 0 Z M 6 12 l 1 0 0 1 -1 0 Z   M 9 12 l 1 0 0 1 -1 0 Z M 10 12 l 1 0 0 1 -1 0 Z M 11 12 l 1 0 0 1 -1 0 Z    M 15 12 l 1 0 0 1 -1 0 Z   M 18 12 l 1 0 0 1 -1 0 Z      M 24 12 l 1 0 0 1 -1 0 Z M 0 13 l 1 0 0 1 -1 0 Z    M 4 13 l 1 0 0 1 -1 0 Z M 5 13 l 1 0 0 1 -1 0 Z   M 8 13 l 1 0 0 1 -1 0 Z  M 10 13 l 1 0 0 1 -1 0 Z M 11 13 l 1 0 0 1 -1 0 Z  M 13 13 l 1 0 0 1 -1 0 Z  M 15 13 l 1 0 0 1 -1 0 Z M 16 13 l 1 0 0 1 -1 0 Z    M 20 13 l 1 0 0 1 -1 0 Z   M 23 13 l 1 0 0 1 -1 0 Z  M 0 14 l 1 0 0 1 -1 0 Z M 1 14 l 1 0 0 1 -1 0 Z   M 4 14 l 1 0 0 1 -1 0 Z M 5 14 l 1 0 0 1 -1 0 Z M 6 14 l 1 0 0 1 -1 0 Z    M 10 14 l 1 0 0 1 -1 0 Z     M 15 14 l 1 0 0 1 -1 0 Z  M 17 14 l 1 0 0 1 -1 0 Z   M 20 14 l 1 0 0 1 -1 0 Z M 21 14 l 1 0 0 1 -1 0 Z M 22 14 l 1 0 0 1 -1 0 Z M 23 14 l 1 0 0 1 -1 0 Z M 24 14 l 1 0 0 1 -1 0 Z M 0 15 l 1 0 0 1 -1 0 Z  M 2 15 l 1 0 0 1 -1 0 Z M 3 15 l 1 0 0 1 -1 0 Z  M 5 15 l 1 0 0 1 -1 0 Z   M 8 15 l 1 0 0 1 -1 0 Z      M 14 15 l 1 0 0 1 -1 0 Z  M 16 15 l 1 0 0 1 -1 0 Z M 17 15 l 1 0 0 1 -1 0 Z M 18 15 l 1 0 0 1 -1 0 Z M 19 15 l 1 0 0 1 -1 0 Z  M 21 15 l 1 0 0 1 -1 0 Z M 22 15 l 1 0 0 1 -1 0 Z  M 24 15 l 1 0 0 1 -1 0 Z M 0 16 l 1 0 0 1 -1 0 Z   M 3 16 l 1 0 0 1 -1 0 Z M 4 16 l 1 0 0 1 -1 0 Z  M 6 16 l 1 0 0 1 -1 0 Z M 7 16 l 1 0 0 1 -1 0 Z M 8 16 l 1 0 0 1 -1 0 Z M 9 16 l 1 0 0 1 -1 0 Z  M 11 16 l 1 0 0 1 -1 0 Z M 12 16 l 1 0 0 1 -1 0 Z M 13 16 l 1 0 0 1 -1 0 Z  M 15 16 l 1 0 0 1 -1 0 Z M 16 16 l 1 0 0 1 -1 0 Z M 17 16 l 1 0 0 1 -1 0 Z M 18 16 l 1 0 0 1 -1 0 Z M 19 16 l 1 0 0 1 -1 0 Z M 20 16 l 1 0 0 1 -1 0 Z  M 22 16 l 1 0 0 1 -1 0 Z M 23 16 l 1 0 0 1 -1 0 Z          M 8 17 l 1 0 0 1 -1 0 Z     M 13 17 l 1 0 0 1 -1 0 Z   M 16 17 l 1 0 0 1 -1 0 Z    M 20 17 l 1 0 0 1 -1 0 Z  M 22 17 l 1 0 0 1 -1 0 Z M 23 17 l 1 0 0 1 -1 0 Z  M 0 18 l 1 0 0 1 -1 0 Z M 1 18 l 1 0 0 1 -1 0 Z M 2 18 l 1 0 0 1 -1 0 Z M 3 18 l 1 0 0 1 -1 0 Z M 4 18 l 1 0 0 1 -1 0 Z M 5 18 l 1 0 0 1 -1 0 Z M 6 18 l 1 0 0 1 -1 0 Z   M 9 18 l 1 0 0 1 -1 0 Z  M 11 18 l 1 0 0 1 -1 0 Z M 12 18 l 1 0 0 1 -1 0 Z  M 14 18 l 1 0 0 1 -1 0 Z M 15 18 l 1 0 0 1 -1 0 Z M 16 18 l 1 0 0 1 -1 0 Z  M 18 18 l 1 0 0 1 -1 0 Z  M 20 18 l 1 0 0 1 -1 0 Z    M 24 18 l 1 0 0 1 -1 0 Z M 0 19 l 1 0 0 1 -1 0 Z      M 6 19 l 1 0 0 1 -1 0 Z   M 9 19 l 1 0 0 1 -1 0 Z    M 13 19 l 1 0 0 1 -1 0 Z  M 15 19 l 1 0 0 1 -1 0 Z M 16 19 l 1 0 0 1 -1 0 Z    M 20 19 l 1 0 0 1 -1 0 Z     M 0 20 l 1 0 0 1 -1 0 Z  M 2 20 l 1 0 0 1 -1 0 Z M 3 20 l 1 0 0 1 -1 0 Z M 4 20 l 1 0 0 1 -1 0 Z  M 6 20 l 1 0 0 1 -1 0 Z  M 8 20 l 1 0 0 1 -1 0 Z M 9 20 l 1 0 0 1 -1 0 Z M 10 20 l 1 0 0 1 -1 0 Z  M 12 20 l 1 0 0 1 -1 0 Z  M 14 20 l 1 0 0 1 -1 0 Z M 15 20 l 1 0 0 1 -1 0 Z M 16 20 l 1 0 0 1 -1 0 Z M 17 20 l 1 0 0 1 -1 0 Z M 18 20 l 1 0 0 1 -1 0 Z M 19 20 l 1 0 0 1 -1 0 Z M 20 20 l 1 0 0 1 -1 0 Z   M 23 20 l 1 0 0 1 -1 0 Z  M 0 21 l 1 0 0 1 -1 0 Z  M 2 21 l 1 0 0 1 -1 0 Z M 3 21 l 1 0 0 1 -1 0 Z M 4 21 l 1 0 0 1 -1 0 Z  M 6 21 l 1 0 0 1 -1 0 Z  M 8 21 l 1 0 0 1 -1 0 Z  M 10 21 l 1 0 0 1 -1 0 Z    M 14 21 l 1 0 0 1 -1 0 Z M 15 21 l 1 0 0 1 -1 0 Z  M 17 21 l 1 0 0 1 -1 0 Z M 18 21 l 1 0 0 1 -1 0 Z     M 23 21 l 1 0 0 1 -1 0 Z M 24 21 l 1 0 0 1 -1 0 Z M 0 22 l 1 0 0 1 -1 0 Z  M 2 22 l 1 0 0 1 -1 0 Z M 3 22 l 1 0 0 1 -1 0 Z M 4 22 l 1 0 0 1 -1 0 Z  M 6 22 l 1 0 0 1 -1 0 Z     M 11 22 l 1 0 0 1 -1 0 Z M 12 22 l 1 0 0 1 -1 0 Z    M 16 22 l 1 0 0 1 -1 0 Z M 17 22 l 1 0 0 1 -1 0 Z   M 20 22 l 1 0 0 1 -1 0 Z M 21 22 l 1 0 0 1 -1 0 Z M 22 22 l 1 0 0 1 -1 0 Z M 23 22 l 1 0 0 1 -1 0 Z M 24 22 l 1 0 0 1 -1 0 Z M 0 23 l 1 0 0 1 -1 0 Z      M 6 23 l 1 0 0 1 -1 0 Z  M 8 23 l 1 0 0 1 -1 0 Z   M 11 23 l 1 0 0 1 -1 0 Z   M 14 23 l 1 0 0 1 -1 0 Z    M 18 23 l 1 0 0 1 -1 0 Z M 19 23 l 1 0 0 1 -1 0 Z M 20 23 l 1 0 0 1 -1 0 Z  M 22 23 l 1 0 0 1 -1 0 Z M 23 23 l 1 0 0 1 -1 0 Z M 24 23 l 1 0 0 1 -1 0 Z M 0 24 l 1 0 0 1 -1 0 Z M 1 24 l 1 0 0 1 -1 0 Z M 2 24 l 1 0 0 1 -1 0 Z M 3 24 l 1 0 0 1 -1 0 Z M 4 24 l 1 0 0 1 -1 0 Z M 5 24 l 1 0 0 1 -1 0 Z M 6 24 l 1 0 0 1 -1 0 Z  M 8 24 l 1 0 0 1 -1 0 Z M 9 24 l 1 0 0 1 -1 0 Z  M 11 24 l 1 0 0 1 -1 0 Z    M 15 24 l 1 0 0 1 -1 0 Z M 16 24 l 1 0 0 1 -1 0 Z  M 18 24 l 1 0 0 1 -1 0 Z   M 21 24 l 1 0 0 1 -1 0 Z   M 24 24 l 1 0 0 1 -1 0 Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              </li>
              <li
                class="mt-4"
              >
                De click sobre el botón 
                <span
                  class="font-bold"
                >
                  Iniciar
                </span>
                . En caso de que
                 
                <span
                  class="font-bold"
                >
                  no aparezca
                </span>
                 dicho botón envie un mensaje con el texto
                 
                <span
                  class="font-bold"
                >
                  "/start"
                </span>
              </li>
              <li
                class="mt-4"
              >
                Copie el código enviado a su cuenta de Telegram, péguelo en el campo siguiente y de click en 
                <span
                  class="font-bold"
                >
                  Activar
                </span>
                .
              </li>
              <form
                class="mt-4"
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
                        Código de activación
                      </label>
                    </div>
                    <div
                      class="relative h-9"
                    >
                      <input
                        class="block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        name="code"
                        placeholder="Escriba el código de activación"
                        value=""
                      />
                    </div>
                  </div>
                  <span
                    class="text-red-500 text-xs"
                  />
                </div>
              </form>
            </ol>
          </div>
        </div>
      </div>
    `);
  });
});
