import {
  Pagination as PaginationBase,
  PaginationProps as PaginationBaseprops
} from 'components/pagination';

import { UseFiltersReturn } from 'hooks/useFilters';

export interface PaginationProps extends Omit<PaginationBaseprops, 'onChange'> {
  filters: UseFiltersReturn;
}

export const Pagination = ({ filters, ...props }: PaginationProps) => {
  return <PaginationBase onChange={({ page }) => filters.onMergeFilters({ page })} {...props} />;
};
