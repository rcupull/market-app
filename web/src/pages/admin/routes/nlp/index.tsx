import { Button } from 'components/button';

import { useNlpTrain } from 'features/api/admin/useNlpTrain';

import { BusinessSearch } from './BusinessSearch';
import { NlpSearch } from './NlpSearch';

import { TopActions } from 'pages/@common/top-actions';

export const Nlp = () => {
  const { nlpTrain } = useNlpTrain();

  return (
    <>
      <TopActions>
        <Button
          className="ml-auto"
          label="Entrenar"
          onClick={() => {
            nlpTrain.fetch();
          }}
        />
      </TopActions>

      <div className="flex gap-4">
        <NlpSearch className="w-1/2" />
        <BusinessSearch className="w-1/2" />
      </div>
    </>
  );
};

export default Nlp;
