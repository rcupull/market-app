import SvgFilterSolid from 'icons/FilterSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FiltersContainerProps extends StyleProps {
  onReset?: () => void;
  children: React.ReactNode;
}

export const FiltersContainer = ({ onReset, children, className }: FiltersContainerProps) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col md:flex-row items-center gap-6 ring-2 ring-gray-200 rounded-sm p-2',
        className,
      )}
    >
      {children}

      <div
        onClick={onReset}
        title="Limpar filtros"
        className="md:h-full w-full md:w-auto bg-gray-100 flex items-center justify-center flex-shrink-0 cursor-pointer hover:ring-2 hover:bg-gray-200 ring-gray-300 rounded-sm"
      >
        <SvgFilterSolid className="fill-red-500 size-8 m-1" />
      </div>
    </div>
  );
};
