import { render } from '@testing-library/react';

import { AddressView } from '.';

describe('AddressView', () => {
  it('render', async () => {
    const result = render(
      <AddressView
        address={{
          apartment: 45,
          city: 'Habana',
          municipality: 'La Lisa',
          neighborhood: 'Los Pinos',
          number: 60,
          street: 'Marrero',
          streetBetweenFrom: '56',
          streetBetweenTo: '89',
        }}
      />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <button
            aria-expanded="false"
            class="flex w-full items-center border border-gray-200 p-2 rounded-sm"
            data-headlessui-state=""
            id="headlessui-disclosure-button-:r0:"
            type="button"
          >
            <svg
              class="w-5 h-5 ml-auto fill-gray-400"
              height="1em"
              viewBox="0 0 32 32"
              width="1em"
            >
              <path
                d="M12.969 4.281L11.53 5.72 21.812 16l-10.28 10.281 1.437 1.438 11-11 .687-.719-.687-.719z"
              />
            </svg>
          </button>
        </div>
      </div>
    `);
  });
});
