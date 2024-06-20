import { render } from '@testing-library/react';

import { ButtonRefresh } from '.';

describe('ButtonRefresh', () => {
  it('render', async () => {
    const result = render(<ButtonRefresh label="Actualizar" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100"
        >
          Actualizar
        </button>
      </div>
    `);
  });
});
