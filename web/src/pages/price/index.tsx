import { HtmlTextContainer } from 'components/html-text-container';

import { LayoutPage } from 'pages/@common/layout-page';

export const Price = () => {
  return (
    <LayoutPage title="Precios">
      <HtmlTextContainer>
        <p>
          Asere Market garantiza el costos de sus servicios según las órdenes de compras realizadas
          para cada negocio teniendo en cuenta las siguientes pautas:
        </p>
        <ol className="mt-4">
          <li className="my-2">
            El cobro de los servicios será el 2% del monto registrado por las órdenes de compra en
            cada negocio.
          </li>
          <li className="my-2">
            ⁠Asere Market le asigna un crédito inicial de 500 CUP a cada negocio durante su
            creación, garantizando al propietario una ganancia mínima 25.000 CUP en ventas sin
            realizar pago alguno por los recursos asignados, de esta forma los propietarios pueden
            insertar sus productos y probar las ventajas del sistema.
          </li>

          <li className="my-2">
            Una vez agotado el crédito inicial, siendo previamente informado 7 dias antes, el
            propietario debe comprar los créditos que necesite para mantener la puesta en línea de
            sus nogocios.
          </li>

          <li className="my-2">
            Cada propietario será el responsable de actualizar sus productos para minimizar el
            número de órdenes de compra que <span className='font-bold'>no</span> sean concretadas como ventas teniendo el apoyo del
            sistema de control de disponibilidad en almacén que el propietario puede habilitar en
            sus productos.
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
