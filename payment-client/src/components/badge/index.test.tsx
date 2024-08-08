import { render } from '@testing-library/react';

import { Badge } from '.';

describe('Badge', () => {
  it('render cart', async () => {
    const result = render(<Badge variant="cart" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200"
        >
          <svg
            aria-hidden="true"
            class="size-8 fill-gray-600"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M5 7c-.55 0-1 .45-1 1s.45 1 1 1h2.219l2.625 10.5c.222.89 1.02 1.5 1.937 1.5H23.25c.902 0 1.668-.598 1.906-1.469L27.75 10H11l.5 2h13.656l-1.906 7H11.781L9.156 8.5A1.983 1.983 0 007.22 7zm17 14c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm9 0c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1z"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('render error', async () => {
    const result = render(<Badge variant="error" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100"
        >
          <svg
            aria-hidden="true"
            class="size-8 fill-red-600"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3.219l-.875 1.5-12 20.781-.844 1.5H29.72l-.844-1.5-12-20.781zm0 4L26.25 25H5.75zM15 14v6h2v-6zm0 7v2h2v-2z"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('render info', async () => {
    const result = render(<Badge variant="info" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
        >
          <svg
            aria-hidden="true"
            class="size-8 fill-blue-600"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-1 5v2h2v-2zm0 4v8h2v-8z"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('render success', async () => {
    const result = render(<Badge variant="success" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
        >
          <svg
            aria-hidden="true"
            class="size-8 fill-green-600"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('render warning', async () => {
    const result = render(<Badge variant="warning" />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200"
        >
          <svg
            aria-hidden="true"
            class="size-8 fill-yellow-600"
            height="1em"
            viewBox="0 0 32 32"
            width="1em"
          >
            <path
              d="M16 3.219l-.875 1.5-12 20.781-.844 1.5H29.72l-.844-1.5-12-20.781zm0 4L26.25 25H5.75zM15 14v6h2v-6zm0 7v2h2v-2z"
            />
          </svg>
        </div>
      </div>
    `);
  });
});
