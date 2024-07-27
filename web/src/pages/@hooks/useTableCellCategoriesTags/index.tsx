import { useMemo } from 'react';

import { Business } from 'types/business';
import { viewUtils } from 'utils/view';

export const useTableCellCategoriesTags = ({
  business,
}: {
  business: Business | undefined | null;
}): {
  onGetTableCellNode: (args: { postCategoriesTags?: Array<string> }) => React.ReactNode;
} => {
  const { postCategories = [] } = business || {};

  const tagsRecord = useMemo<Record<string, string>>(
    () =>
      (postCategories || []).reduce(
        (acc, { tag, label }) => ({
          ...acc,
          [tag]: label,
        }),
        {},
      ),
    [JSON.stringify(postCategories)],
  );

  return {
    onGetTableCellNode: ({ postCategoriesTags }) => {
      return (
        <div key="categories" className="flex flex-wrap max-w-48">
          {viewUtils.mapToOutlinedBox({
            value: postCategoriesTags,
            preMap: (tag) => tagsRecord[tag],
          })}
        </div>
      );
    },
  };
};
