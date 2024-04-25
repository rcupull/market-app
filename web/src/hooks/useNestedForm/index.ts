import { useEffect } from 'react';

import { AnyRecord } from 'types/general';

export const useNestedForm = <V extends AnyRecord = AnyRecord>(args: {
  field: {
    name: string;
    value: V;
    onChange: (e: any) => void;
  };
  initialValues: V;
}): {
  getFieldName: (fieldName: keyof V) => string;
  value: V;
} => {
  const { field, initialValues } = args;
  const { name, onChange, value } = field;

  useEffect(() => {
    if (!value && name && initialValues) {
      onChange?.({
        target: {
          name,
          value: initialValues,
        },
      });
    }
  }, []);

  return {
    getFieldName: (fieldname) => `${name}.${fieldname.toString()}`,
    value,
  };
};
