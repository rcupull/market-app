import { Address, StyleProps } from 'types/general';
import { cn } from 'utils/general';

const keys: Array<keyof Address> = [
  'street',
  'number',
  'apartment',
  'streetBetweenFrom',
  'streetBetweenTo',
  'neighborhood',
  'city',
  'municipality',
];

const labels: Record<keyof Address, string> = {
  apartment: 'apto',
  city: 'ciudad',
  municipality: 'municipio',
  neighborhood: 'reparto',
  number: '#',
  street: '',
  streetBetweenFrom: 'entre',
  streetBetweenTo: 'y',
};

export interface AddressViewProps extends StyleProps {
  address: Address;
}
export const AddressView = ({ address, className }: AddressViewProps) => {
  return (
    <div className={cn('flex flex-wrap',className)}>
      {keys
        .filter((key) => !!address[key])
        .map((key) => {
          return (
            <>
              <span className="text-gray-400 mx-0.5">{`${labels[key]}`}</span>
              <span className="font-semibold mx-0.5">{address[key]}</span>
            </>
          );
        })}
    </div>
  );
};
