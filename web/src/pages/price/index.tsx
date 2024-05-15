import { HtmlTextContainer } from 'components/html-text-container';

import { LayoutPage } from 'pages/@common/layout-page';

export const Price = () => {
  return (
    <LayoutPage title="Precio">
      <HtmlTextContainer>
        <p>
          Los costos de los servicios de Asere Market dependen de las órdenes de compras realizadas
          para cada negocio, siguiendo las siguientes pautas:
        </p>
        <ol className="mt-4">
          <li className="my-2">
            El cobro de los servicios será el 2% del monto registrado por las órdenes de compra en
            cada negocio.
          </li>
          <li className="my-2">
            Asere Market le asigna un crédito inicial de 500 CUP a cada negocio durante su creación.
            Con este crédito el propietario puede realizar hasta 25.000 CUP en ventas sin realizar
            pago alguno por los recursos del sistema. De esta forma los propietarios pueden insertar
            sus productos y probar las ventajas del sistema sin abonarle nada a Asere Market.
          </li>

          <li className="my-2">
            Una vez agotado el crédito inicial cada propietario debe comprar los créditos que
            necesite para mantener sus ventas en cada negocio.
          </li>

          <li className="my-2">
            Al agotarse el crédito, ya sea el inicial o el comprado por el propietario, Asere Market
            informará a cada propietario dando una margen de 7 días para comprar más créditos y
            mantener la puesta en linea de sus nogocios.
          </li>

          <li className="my-2">
            Cada propietario será el responsable de tener sus productos actualizados para minimizar
            el número de órdenes de compra que sean concretadas como ventas. Para apoyar este
            proceso Asere Market posee un sistema de control de disponibilidad en almacén que el
            propietario puede habilitar en sus productos.
          </li>
          <li className="my-2">
            El sistema se resposabiliza de “bannar” a los usuario que reiteradamente generen órdenes
            de compra y no efectuen ventas satisfactorias protegiendo asi el flujo de ventas de cada
            negocio.
          </li>
        </ol>
      </HtmlTextContainer>
    </LayoutPage>
  );
};
