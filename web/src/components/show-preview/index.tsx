import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ShowPreviewProps extends StyleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}
export const ShowPreview = ({ onChange, value, className }: ShowPreviewProps) => {
  const label = `${value ? '(Ocultar vista previa)' : '(Mostrar vista previa)'}`;

  return (
    <div
      className={cn('text-indigo-500 cursor-pointer', className)}
      onClick={() => onChange(!value)}
    >
      {label}
    </div>
  );
};
