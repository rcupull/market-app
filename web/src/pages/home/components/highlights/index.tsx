import { Highlight, HighlightProps } from './Highlight';

import SvgBoxesSolid from 'icons/BoxesSolid';
import SvgCalendarAlt from 'icons/CalendarAlt';
import SvgFigma from 'icons/Figma';
import SvgGlobeAmericasSolid from 'icons/GlobeAmericasSolid';
import SvgUniversalAccessSolid from 'icons/UniversalAccessSolid';
import SvgUserTagSolid from 'icons/UserTagSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const items: Array<HighlightProps> = [
  {
    svg: SvgGlobeAmericasSolid,
    label: 'Espacio único',
    description: <div>Organice sus productos para facilitar una venta fácil y eficiente.</div>,
  },
  {
    svg: SvgUniversalAccessSolid,
    label: 'Accesibilidad',
    description: (
      <div>Cree su marketplace y posiciónese en nuestro mercado de forma rápida y sencilla.</div>
    ),
  },
  {
    svg: SvgFigma,
    label: 'Flexibilidad',
    description: (
      <div>
        ¡Puede plasmar la identidad de su negocio con solo un click! Con nuestra tecnología de punta
        puede ajustar su marketplace a su gusto.
      </div>
    ),
  },
  {
    svg: SvgBoxesSolid,
    label: 'Manejo de stock',
    description: (
      <div>
        Garantizamos que la cantidad en almacén de sus productos estén siempre actualizados.
      </div>
    ),
  },
  {
    svg: SvgUserTagSolid,
    label: 'Suscripciones',
    description: <div>Notificamos a los clientes de cada nueva oferta que registre, actualizaciones de productos y ofertas especiales.</div>,
  },
  {
    svg: SvgCalendarAlt,
    label: 'Disponibilidad',
    description: (
      <div>¡El tiempo es dinero! Mantenga su negocio en funcionamiento y no pierda ventas.</div>
    ),
  },
];

export interface HighlightsProps extends StyleProps {}

export const Highlights = ({ className }: HighlightsProps) => {
  return (
    <div className={cn('w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4', className)}>
      {items.map((item, index) => (
        <Highlight key={index} {...item} />
      ))}
    </div>
  );
};
