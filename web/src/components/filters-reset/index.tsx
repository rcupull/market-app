import SvgFilterSolid from 'icons/FilterSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FiltersResetProps extends StyleProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const FiltersReset = ({ onClick, children, className }: FiltersResetProps) => {
  return (
    <div className={cn('w-full flex flex-col md:flex-row items-center gap-6', className)}>
      <div className="ring-2 ring-gray-200 rounded-sm w-full p-2">{children}</div>

      <div
        onClick={onClick}
        title="Limpar filtros"
        className="md:h-full w-full md:w-auto bg-gray-100 flex items-center justify-center flex-shrink-0 cursor-pointer hover:ring-2 hover:bg-gray-200 ring-gray-300 rounded-sm"
      >
        <SvgFilterSolid className="fill-red-500 size-8 m-1" />
      </div>
    </div>
  );
};
