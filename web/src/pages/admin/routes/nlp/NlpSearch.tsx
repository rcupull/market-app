import { useNlpSearch } from 'features/api/admin/useNlpSearch';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { FilterQuery } from './types';

import { StyleProps } from 'types/general';

export interface NlpSearchProps extends StyleProps {}

export const NlpSearch = ({ className }: NlpSearchProps) => {
  const { nlpSearch } = useNlpSearch();

  const filters = useFiltersVolatile<FilterQuery>({
    onChange: (query) => nlpSearch.fetch(query),
  });

  return (
    <div className={className}>
      <Filters onChange={(e) => filters.onMergeFilters(e)} />

      <div className="mt-3 text-lg">{`intent: ${nlpSearch.data?.intent}`}</div>
      <pre className="mt-3">{JSON.stringify(nlpSearch.data, null, 2)}</pre>
    </div>
  );
};
