import { render, screen, waitFor } from '@testing-library/react';

import { ButtonClose } from '.';

import { getWrapper } from 'utils/test-utils';

describe('ButtonClose', () => {
  it('render', async () => {
    render(<ButtonClose />, {
      wrapper: getWrapper({ useRedux: true, useRouter: true, useModal: true }),
    });

    await waitFor(() =>
      expect(screen.getByText('Cerrar')).toMatchInlineSnapshot(`
        <button
          class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100"
        >
          Cerrar
        </button>
      `)
    );
  });
});
