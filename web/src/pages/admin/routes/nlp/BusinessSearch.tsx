import { useBusinessSearch } from 'features/api/business/useBusinessSearch';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { FilterQuery } from './types';

import { StyleProps } from 'types/general';

export interface BusinessSearchProps extends StyleProps {}
export const BusinessSearch = ({ className }: BusinessSearchProps) => {
  const { businessSearch } = useBusinessSearch();

  const filters = useFiltersVolatile<FilterQuery>({
    onChange: (query) => businessSearch.fetch(query)
  });

  return (
    <div className={className}>
      <Filters onChange={(e) => filters.onMergeFilters(e)} />

      <pre className="mt-3">{JSON.stringify(businessSearch.data, null, 2)}</pre>
    </div>
  );
};
