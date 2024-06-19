import { render } from '@testing-library/react';

import { ButtonNew } from '.';

describe('ButtonNew', () => {
  it('render', async () => {
    const result = render(<ButtonNew label="Nuevo" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-indigo-600 text-white fill-white hover:bg-indigo-500 hover:bg-indigo-500"
        >
          Nuevo
        </button>
      </div>
    `);
  });
});
