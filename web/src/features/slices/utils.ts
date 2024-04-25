import { createSlice } from '@reduxjs/toolkit';

export const createSimpleSlice = <T extends any | null = null>(name: string, initialState: T) => {
  //@ts-expect-error ignore other params
  return createSlice<T>({
    name,
    initialState: initialState,
    reducers: {
      setState: (_, { payload }) => {
        return payload;
      },
      reset: () => {
        return null;
      },
    },
  });
};
