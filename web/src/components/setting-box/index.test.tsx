import { render } from '@testing-library/react';

import { SettingBox } from '.';

import SvgAccessibleIcon from 'icons/AccessibleIcon';

describe('SettingBox', () => {
  it('render', async () => {
    const result = render(
      <SettingBox svg={SvgAccessibleIcon} title="title" description="description" />
    );

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full h-full gap-1 p-2 border border-gray-300 rounded-md flex flex-col"
        >
          <div
            class="flex items-center justify-center "
          >
            <svg
              class="h-32 w-24 fill-gray-400 text-gray-400"
              height="1em"
              viewBox="0 0 32 32"
              width="1em"
            >
              <path
                d="M24 4c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm-5.438 3.031l-3.593.406c-.57.067-1.047.407-1.375.876l-.031-.032-.032.063-2.312 3.062 1.562 1.188 2.375-3.094.063-.063 2.187-.25-1.687 3.844A7.001 7.001 0 0010.25 18h2.781c.832-.621 1.856-1 2.969-1 2.758 0 5 2.242 5 5s-2.242 5-5 5c-1.629 0-3.055-.793-3.969-2H9.687c1.126 2.36 3.528 4 6.313 4 3.86 0 7-3.14 7-7 0-.34-.047-.672-.094-1h1.969l-1.531 5.75 1.937.5 1.657-6.219.062-.218-.031-.25C26.769 19.648 25.934 19 25 19h-2.688a6.963 6.963 0 00-1.125-1.656l1.625-3.407.032-.062v-.031a3.003 3.003 0 00-1.407-3.656L19.75 9.25v.031c-.36-.191-.785-.297-1.188-.25zm.907 2.344l1.031.563c.445.238.64.746.469 1.218L19.594 16a6.932 6.932 0 00-1.813-.75zM7 19v2h7v-2zm-3 3v2h13v-2z"
              />
            </svg>
          </div>
          <h2
            class="font-bold"
          >
            title
          </h2>
          <span
            class="text-sm"
          >
            description
          </span>
          <div
            class="mt-auto flex items-center justify-end"
          >
            <button
              class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    `);
  });
});
