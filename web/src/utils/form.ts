import { AnyRecord } from 'types/general';

export const getRequiredLabel = (label: string): string => `${label} *`;

export const getNestedFieldName = <V extends AnyRecord = AnyRecord>(
  field: {
    name: string;
    value: V;
    onChange: (e: any) => void;
  },
  fieldName: string,
): string => {
  return `${field.name}.${fieldName.toString()}`;
};
