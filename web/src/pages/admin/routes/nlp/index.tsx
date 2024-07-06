import { Button } from 'components/button';

import { useNlpTrain } from 'features/api/admin/useNlpTrain';

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
    </LayoutPageSection>
  );
};

export default Nlp;
