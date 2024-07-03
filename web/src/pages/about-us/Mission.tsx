import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface MissionProps extends StyleProps {}

export const Mission = ({ className }: MissionProps) => {
  // const renderKpi = (label: string, description: string) => {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <p className="text-5xl font-bold">{label}</p>
  //       <p>{description}</p>
  //     </div>
  //   );
  // };

  return (
    <div className={cn('flex gap-28', className)}>
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold">Nuestra misión</p>

        <p>
          Ofrecemos una servicio web dirigido para emprendedores cubanos que necesitan potenciar sus
          ventas con tecnología, creando un espacio unico donde mostrar sus productos y supervisar sus ventas.
        </p>

        <p>
          Nustros servicios son más que una plataforma de comercio. Establece una espacio donde solos sus productos serán visibles para
          Cuba y el mundo. 
        </p>
        <p>
          Usted gestiona personalmente la estructura de sus páginas, administrando el que y como
          será visualizados sus publicaciones
        </p>
        <p>
          Contamos con un equipo de desarrollo competente enfocado en mejorar contantemente los
          servicios que se pretann actualmente y agregar constantemente mejoraas y nuevas
          funcionalidades que podran ser usadas por todos nustros clientes
        </p>

        <p>Registra tu negocio en una plataforma hecha en cuba y para cuba. </p>
        <p>Publica facilmente con nosotros, si contratar servicios tecnologicos fuera del pais. </p>
        <p>
          Precios competitivos en moneda nacional en nuestros planes de pago y capas gratuitas o
          temporales para que pruebes nustroso servicios
        </p>
      </div>

      {/* <div className="w-96 flex-shrink-0 flex flex-col gap-12">
        {renderKpi('1,000', 'Usuarios nuevos mensualmente')}
        {renderKpi('100', 'Negocios creados cada mes')}
        {renderKpi('10,000', 'Ventas efectuadas en nuestro sistema')}
      </div> */}
    </div>
  );
};
