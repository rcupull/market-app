import { useEffect, useState } from 'react';

import { FetchResourceWithPagination } from 'types/api';
import { AnyRecord } from 'types/general';

export const useInfinityScrolling = <RowData extends AnyRecord = AnyRecord>(args: {
  fetchPaginatedResources: FetchResourceWithPagination<AnyRecord, RowData>;
  onFetch: (args: { page: number }) => void;
}): {
  tableData: Array<RowData>;
  onScrollBottom: () => void;
} => {
  const { onFetch, fetchPaginatedResources } = args;

  const { data, paginator } = fetchPaginatedResources;

  const [tableData, setTableData] = useState<Array<RowData>>([]);

  useEffect(() => {
    if (paginator && data) {
      const { page } = paginator;

      if (page === 1) {
        setTableData([...data]);
      } else {
        setTableData((currentData) => [...currentData, ...data]);
      }
    }
  }, [data]);

  return {
    tableData,
    onScrollBottom: () => {
      if (paginator) {
        const { page, hasNextPage } = paginator;

        if (hasNextPage) {
          onFetch({ page: page + 1 });
        }
      }
    },
  };
};
