import { Button } from 'components/button';

import { useNlpSearch } from 'features/api/admin/useNlpSearch';
import { useNlpTrain } from 'features/api/admin/useNlpTrain';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { FilterQuery } from './types';

import { LayoutPageSection } from 'pages/@common/layout-page-section';

export const Nlp = () => {
  const { nlpTrain } = useNlpTrain();
  const { nlpSearch } = useNlpSearch();

  const filters = useFiltersVolatile<FilterQuery>({
    onChange: (query) => nlpSearch.fetch(query),
  });

  return (
    <LayoutPageSection title="Nlp">
      <Button
        label="Entrenar"
        onClick={() => {
          nlpTrain.fetch();
        }}
      />

      <Filters onChange={(e) => filters.onMergeFilters(e)} />

      <div className="mt-3 text-lg">{`intent: ${nlpSearch.data?.intent}`}</div>
      <pre className="mt-3">{JSON.stringify(nlpSearch.data, null, 2)}</pre>
    </LayoutPageSection>
  );
};

export default Nlp;
