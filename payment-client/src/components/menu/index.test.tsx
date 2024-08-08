import { render } from '@testing-library/react';

import { Menu } from '.';

describe('Menu', () => {
  it('render', async () => {
    const result = render(
      <Menu
        buttonElement={<button>Button</button>}
        bottomElement={<div>Bottom</div>}
        topElement={<div>Top</div>}
        items={[
          {
            label: 'Label1',
            onClick: () => {}
          },
          {
            label: 'Label2',
            onClick: () => {}
          }
        ]}
      />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="relative"
          data-headlessui-state=""
          data-id="Menu"
        >
          <div
            aria-expanded="false"
            aria-haspopup="menu"
            class="cursor-pointer w-fit"
            data-headlessui-state=""
            id="headlessui-menu-button-:r2:"
          >
            <button>
              Button
            </button>
          </div>
        </div>
      </div>
    `);
  });
});
