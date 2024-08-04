import { createContext } from 'react';

export const CloseContext = createContext({
  //@ts-expect-error ignore
  //eslint-disable-next-line
  onChangeUnsavedChanges: (value: boolean) => {}
});
