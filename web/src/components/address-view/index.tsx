import { Address, StyleProps } from 'types/general';

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
  street: 'calle ',
  streetBetweenFrom: 'entre',
  streetBetweenTo: 'y',
};

export interface AddressViewProps extends StyleProps {
  address: Address;
}
export const AddressView = ({ address, className }: AddressViewProps) => {
  return (
    <div className={className}>
      {keys
        .filter((key) => !!address[key])
        .map((key) => {
          return (
            <>
              <span className="font-semibold mr-0.5">{`${labels[key]}`}</span>
              <span className="text-gray-500 mr-2">{address[key]}</span>
            </>
          );
        })}
    </div>
  );
};
