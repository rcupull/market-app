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
          country: 'Cuba',
          countryCode: 'asdads',
          lat: -7,
          lon: 7,
          placeId: 'asdasd',
          postCode: 'asdasda',
        }}
      />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex flex-wrap"
        >
          <span
            class="text-gray-400 mx-0.5"
          />
          <span
            class="font-semibold mx-0.5"
          >
            Marrero
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            #
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            60
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            apto
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            45
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            entre
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            56
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            y
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            89
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            reparto
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            Los Pinos
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            ciudad
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            Habana
          </span>
          <span
            class="text-gray-400 mx-0.5"
          >
            municipio
          </span>
          <span
            class="font-semibold mx-0.5"
          >
            La Lisa
          </span>
        </div>
      </div>
    `);
  });
});
