import { LayoutPage } from 'pages/@common/layout-page';

export const AboutUs = () => {
  return (
    <LayoutPage title="¿Que es Asere Market?">
      <div className="flex flex-col items-start gap-4">
        <div>
          Somos un equipo tecnologico y de comunicacion con el proposito de cambiar parte de la
          realidad cubana, reduciendo los limites entre un emprendedor con ancias de exito y un
          mundo tecnologico dificil de tocar desde el interior de Cuba.
        </div>

        <div>
          Ofrecemos una servicio web dirigida para los emprendedores, vendedores, creadores y
          emporesas cubanas que necesitan promosionar las ventas de sus productos y no poseen ese
          espacio digital donde visualizar el concepto de sus aspiraciones.
        </div>

        <div>
          Establece una espacio unico para su negocio donde solos sus productos serán visibles para
          Cuba y el mundo.
        </div>
        <div>
          Usted gestiona personalmente la estructura de sus paginas, administrando el que y como
          será visualizados sus publicaciones
        </div>
        <div>
          Contamos con un equipo de desarrollo competente enfocado en mejorar contantemente los
          servicios que se pretann actualmente y agregar constantemente mejoraas y nuevas
          funcionalidades que podran ser usadas por todos nustros clientes
        </div>

        <div>Registra tu negocio en una plataforma hecha en cuba y para cuba. </div>
        <div>
          Publica facilmente con nosotros, si contratar servicios tecnologicos fuera del pais.{' '}
        </div>
        <div>
          Precios competitivos en moneda nacional en nuestros planes de pago y capas gratuitas o
          temporales para que pruebes nustroso servicios
        </div>
      </div>
    </LayoutPage>
  );
};
