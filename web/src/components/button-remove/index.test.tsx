import { render } from '@testing-library/react';

import { ButtonRemove } from '.';

describe('ButtonRemove', () => {
  it('render', async () => {
    const result = render(<ButtonRemove label="Eliminar" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-red-600 text-white fill-white  hover:bg-red-500"
        >
          Eliminar
        </button>
      </div>
    `);
  });
});
