import { useDispatch, useSelector } from 'react-redux';

import { store } from 'features/redux/setupReduxBackdoor';

export const useSimpleSlice = <D = any, N extends string = string>(
  name: N,
): {
  setData: (dataHandle: D | ((oldData: D) => D)) => void;
  reset: () => void;
  data: D;
} => {
  const dispatch = useDispatch();
  const data = useSelector<{ [k in N]: D }, D>((state) => state[name]);

  return {
    data,
    setData: (d) => {
      const currentData = store.getState()[name];

      if (d instanceof Function) {
        dispatch({ type: `${name}/setState`, payload: d(currentData) });
      } else {
        dispatch({ type: `${name}/setState`, payload: d });
      }
    },
    reset: () => {
      dispatch({ type: `${name}/reset` });
    },
  };
};
