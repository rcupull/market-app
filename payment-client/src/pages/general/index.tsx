import { Button } from 'components/button';

import { useToast } from 'features/toast';
import { useUssd } from 'features/ussd/useUssd';

import { LayoutPage } from 'pages/@common/layout-page';

const ussdCodes = {
  consulta_saldo: '*222#',
  consulta_datos: '*222*328#'
};

export const General = () => {
  const ussd = useUssd();
  const { showMessage } = useToast();

  return (
    <LayoutPage>
      <div className='flex flex-col gap-3'>
      <Button
        label="Consultar saldo"
        onClick={() => {
          ussd.onCallUssd(ussdCodes['consulta_saldo'], {
            onAfterSuccess: ({ result }) => {
              showMessage({
                title: 'SALDO',
                body: result,
                meta: undefined
              });
            }
          });
        }}
      />

      <Button
        label="Consultar datos"
        onClick={() => {
          ussd.onCallUssd(ussdCodes['consulta_datos'], {
            onAfterSuccess: ({ result }) => {
              showMessage({
                title: 'DATOS',
                body: result,
                meta: undefined
              });
            }
          });
        }}
      />
      </div>
    </LayoutPage>
  );
};

export default General;
