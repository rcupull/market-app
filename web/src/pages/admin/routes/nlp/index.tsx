import { Button } from 'components/button';

import { useNlpTrain } from 'features/api/admin/useNlpTrain';

import { BusinessSearch } from './BusinessSearch';
import { NlpSearch } from './NlpSearch';

import { LayoutPageSection } from 'pages/@common/layout-page-section';

export const Nlp = () => {
  const { nlpTrain } = useNlpTrain();

  return (
    <LayoutPageSection title="Nlp">
      <Button
        label="Entrenar"
        onClick={() => {
          nlpTrain.fetch();
        }}
      />

      <div className="flex gap-4">
        <NlpSearch className="w-1/2" />
        <BusinessSearch className="w-1/2" />
      </div>
    </LayoutPageSection>
  );
};

export default Nlp;
