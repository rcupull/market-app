import { useEffect, useState } from 'react';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { FetchData } from 'types/api';
import { AnyRecord } from 'types/general';
import { isNumber, updateRow } from 'utils/general';

export const useHotUpdateTableData = <
  T extends AnyRecord = AnyRecord,
  Args extends AnyRecord = AnyRecord,
>({
  updateKey,
  data,
  findCB,
  changeCB,
}: {
  updateKey: string;
  data: FetchData<Array<T>>;
  findCB: (rowData: T, args: Args) => boolean;
  changeCB: (rowData: T, args: Args) => T;
}): {
  data: FetchData<Array<T>>;
} => {
  const [state, setState] = useState<FetchData<Array<T>>>(null);

  useCallFromAfar(updateKey, (args) => {
    if (!state) return;

    const index = data?.findIndex((rowData) => findCB(rowData, args));

    if (isNumber(index) && index >= 0) {
      const rowData = state[index];
      setState([...updateRow(state, changeCB(rowData, args), index)]);
    }
  });

  useEffect(() => {
    setState(data);
  }, [JSON.stringify(data)]);

  return {
    data: state,
  };
};
