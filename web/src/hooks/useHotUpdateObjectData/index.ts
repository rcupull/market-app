import { useEffect, useState } from 'react';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { FetchData } from 'types/api';
import { AnyRecord } from 'types/general';

export const useHotUpdateObjectData = <
  T extends AnyRecord = AnyRecord,
  Args extends AnyRecord = AnyRecord
>({
  updateKey,
  data,
  changeCB
}: {
  updateKey: string;
  data: FetchData<T>;
  changeCB: (rowData: T, args: Args) => T;
}): {
  data: FetchData<T>;
} => {
  const [state, setState] = useState<FetchData<T>>(null);

  useCallFromAfar(updateKey, (args) => {
    if (!state) return;

    setState(changeCB(state, args));
  });

  useEffect(() => {
    setState(data);
  }, [JSON.stringify(data)]);

  return {
    data: state
  };
};
