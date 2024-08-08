import { render } from '@testing-library/react';

import { BulkActions } from '.';

describe('BulkActions', () => {
  it('render', async () => {
    const result = render(
      <BulkActions
        renderMenuNode={() => <></>}
        getBulkActionBtnProps={() => ({})}
        refMeta={{
          current: {
            onReset: () => {},
            selected: [],
            selectedAll: false
          }
        }}
      >
        {() => <></>}
      </BulkActions>
    );

    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
