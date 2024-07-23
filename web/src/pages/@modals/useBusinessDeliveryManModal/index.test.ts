import { act, fireEvent, renderHook, screen, waitFor } from '@testing-library/react';

import { useBusinessDeliveryManModal } from '.';

import { getWrapper } from 'utils/test-utils';

describe('useBusinessDeliveryManModal', () => {
  it('should close when click on the close button', async () => {
    const { result } = renderHook(() => useBusinessDeliveryManModal(), {
      wrapper: getWrapper({ useRouter: true, useModal: true }),
    });

    act(() => result.current.businessDeliveryManModal.open());

    await waitFor(() => expect(screen.getByTestId('Modal')));

    fireEvent.click(screen.getByText('Cerrar'));

    await waitFor(() => expect(screen.queryByTestId('Modal')).toBeNull());
  });

  it('should match snapshot', async () => {
    const { result } = renderHook(() => useBusinessDeliveryManModal(), {
      wrapper: getWrapper({ useRouter: true, useModal: true }),
    });

    act(() => result.current.businessDeliveryManModal.open());

    await waitFor(() =>
      expect(screen.getByTestId('Modal')).toMatchInlineSnapshot(`
        <div
          aria-labelledby="headlessui-dialog-title-:rh:"
          aria-modal="true"
          class="relative z-30"
          data-headlessui-state="open"
          data-open=""
          data-testid="Modal"
          id="headlessui-dialog-:r9:"
          role="dialog"
          tabindex="-1"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
          <div
            class="fixed inset-0 z-10 w-screen overflow-y-auto"
          >
            <div
              class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <div
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 md:w-8/12 lg:w-8/12"
                data-headlessui-state="open"
                data-open=""
                id="headlessui-dialog-panel-:rg:"
              >
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 !rounded-full !p-2 !ring-0 !shadow-none !absolute top-0 right-0"
                >
                  <svg
                    class="h-5 w-5"
                    height="1em"
                    viewBox="0 0 32 32"
                    width="1em"
                  >
                    <path
                      d="M7.219 5.781L5.78 7.22 14.563 16 5.78 24.781 7.22 26.22 16 17.437l8.781 8.782 1.438-1.438L17.437 16l8.782-8.781L24.78 5.78 16 14.563z"
                    />
                  </svg>
                </button>
                <div
                  class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                >
                  <div
                    class="sm:flex sm:items-start w-full"
                  >
                    <div
                      class="mx-9 sm:mx-2 flex justify-center"
                    >
                      <div
                        class="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200"
                      >
                        <svg
                          aria-hidden="true"
                          class="size-8"
                          height="1em"
                          viewBox="0 0 32 32"
                          width="1em"
                        >
                          <path
                            d="M1 4v21h3.156c.446 1.719 1.992 3 3.844 3 1.852 0 3.398-1.281 3.844-3h8.312c.446 1.719 1.992 3 3.844 3 1.852 0 3.398-1.281 3.844-3H31V14.594l-.281-.313-6-6L24.406 8H19V4zm2 2h14v17h-5.156c-.446-1.719-1.992-3-3.844-3-1.852 0-3.398 1.281-3.844 3H3zm16 4h4.563L29 15.438V23h-1.156c-.446-1.719-1.992-3-3.844-3-1.852 0-3.398 1.281-3.844 3H19zM8 22c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm16 0c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      class="mt-3 sm:ml-4 sm:mt-0 w-full"
                    >
                      <h3
                        class="text-xl font-semibold text-gray-900"
                        data-headlessui-state="open"
                        data-open=""
                        id="headlessui-dialog-title-:rh:"
                      >
                        Mensajeros
                      </h3>
                      <div
                        class="mt-4"
                      >
                        <div
                          class="flex justify-center items-center fixed inset-0 z-50"
                        >
                          <div>
                            <div
                              class="rcs-ellipsis"
                              style="--rcs-ellipsis-color: rgba(0,0,0, 0.5);"
                            >
                              <div />
                              <div />
                              <div />
                              <div />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6"
                >
                  <button
                    class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100 w-full sm:w-auto mt-3 sm:mt-0 ml-0 sm:ml-auto"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `)
    );
  });
});
