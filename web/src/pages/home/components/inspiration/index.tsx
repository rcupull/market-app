import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface InspirationProps extends StyleProps {}

export const Inspiration = ({ className }: InspirationProps) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center bg-gray-100 px-2 md:px-8 py-6 rounded-2xl',
        className,
      )}
    >
      <div className="text-indigo-700 font-bold text-center flex-shrink-0">
        Publica fácil, vende aún más fácil.
      </div>

      <div className="text-4xl font-bold mt-4 text-center flex-shrink-0">
        Crea tu negocio online en Cuba
      </div>

      <div className="max-w-[40rem] text-center mt-6">
        Haz crecer tu negocio online en Cuba y usa <span className="font-bold">Asere Market</span>{' '}
        para enganchar a tus clientes. Crece a lo grande, promociona tus productos y aumenta tus
        ventas.
      </div>
    </div>
  );
};
