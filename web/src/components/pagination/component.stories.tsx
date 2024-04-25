import { useState } from 'react';

import { Pagination } from '.';

import { Paginator } from 'types/api';

export default {
  component: Pagination,
};

export const Default = () => {
  const [paginator, setPaginator] = useState<Paginator>({
    dataCount: 175,
    hasNextPage: true,
    hasPrevPage: true,
    limit: 10,
    nextPage: undefined,
    offset: 0,
    page: 3,
    pagingCounter: 0,
    prevPage: undefined,
    pageCount: 8,
  });

  const handleChange = (newPaginator: Paginator) => {
    const out = { ...newPaginator };

    const { page, pageCount } = out;

    out.hasPrevPage = page > 1;
    out.hasNextPage = page < pageCount;

    setPaginator(out);
  };

  return (
    <>
      <Pagination onChange={handleChange} paginator={paginator} />
      <br />
      <br />
      <br />
      <Pagination onChange={handleChange} paginator={paginator} />
    </>
  );
};
