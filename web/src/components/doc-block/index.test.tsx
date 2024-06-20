import { render } from '@testing-library/react';

import { DocBlock } from '.';

describe('DocBlock', () => {
  it('render', async () => {
    const result = render(
      <DocBlock
        items={[
          {
            title: 'title',
            items: [<div key="0">item0</div>, <div key="1">item1</div>],
          },
        ]}
      />,
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class="no-preflight"
          >
            <h4
              class="font-bold  my-4"
            >
              title
            </h4>
            <ul
              class="ml-4"
            >
              <li
                class="text-sm mb-1 mt-3"
              >
                <div>
                  item0
                </div>
              </li>
              <li
                class="text-sm mb-1 mt-3"
              >
                <div>
                  item1
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `);
  });
});
