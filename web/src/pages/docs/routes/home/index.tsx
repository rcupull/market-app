import { Link } from 'react-router-dom';

import { DocBlock } from 'components/doc-block';

import { LayoutPage } from 'pages/@common/layout-page';

export const Home = () => {
  return (
    <LayoutPage title="Documentación">
      <DocBlock
        title="Como crear tu primer negocio en Asere Market"
        summary="Los siguientes topics tienen como objetivo indicar que hacer para crear tu primer emprendimiento en Asere Market"
        items={[
          {
            title: 'Configuración basica de un negocio en Asere Market',
            items: [
              <>
                <Link to="/docs/business-config-wizard">
                  Usar el asistente automático para realizar la configuracion básica de mi negocio.
                </Link>{' '}
                (Recomendado para usuarios sin experiencia.)
              </>,
              <>
                <Link to="/docs/business-config-manual">
                  Configurar un negocio manualmente desde el cero.
                </Link>
              </>,
            ],
          },
          {
            title: 'Como cambiar el logo de un negocio',
            items: [<>En el paner de control de tu negocio</>],
          },
        ]}
      />
    </LayoutPage>
  );
};

export default Home;
