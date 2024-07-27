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
    description: <div>Organiza tus productos individualmente, tus clientes te lo agradecerán.</div>,
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
        ¡Puedes promocionar tu negocio con solo un click! Nuestra tecnología de punta permite que
        ajustes el diseño de tu marketplace para reforzar tu imagen.
      </div>
    ),
  },
  {
    svg: SvgBoxesSolid,
    label: 'Manejo de stock',
    description: (
      <div>
        Actualizamos tus productos disponibles en el almacén, así tienes más tiempo para vender.
      </div>
    ),
  },
  {
    svg: SvgUserTagSolid,
    label: 'Suscripciones',
    description: (
      <div>
        Recomendamos tus productos y servicios a los clientes y le hacemos llegar tus ofertas
        especiales.
      </div>
    ),
  },
  {
    svg: SvgCalendarAlt,
    label: 'Disponibilidad',
    description: <div>Mantén tu negocio en constante actividad. ¡El tiempo es dinero!</div>,
  },
];

export interface HighlightsProps extends StyleProps {}

export const Highlights = ({ className }: HighlightsProps) => {
  return (
    <div
      className={cn(
        'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-4',
        className,
      )}
    >
      {items.map((item, index) => (
        <Highlight key={index} {...item} />
      ))}
    </div>
  );
};
