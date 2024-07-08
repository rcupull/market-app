import { useEffect, useState } from 'react';

import { FetchResourceWithPagination, FetchStatus } from 'types/api';
import { AnyRecord } from 'types/general';

export const useInfiniteScrolling = <RowData extends AnyRecord = AnyRecord>(args: {
  fetchPaginatedResources: FetchResourceWithPagination<AnyRecord, RowData>;
  onFetch: (args: { page: number }) => void;
}): {
  data: Array<RowData>;
  onScrollBottom: () => void;
  fetch: () => void;
  status: FetchStatus;
} => {
  const { onFetch, fetchPaginatedResources } = args;

  const { data, paginator, status } = fetchPaginatedResources;

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
    status,
    data: tableData,
    fetch: () => onFetch({ page: 1 }),
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
