import { BrowserRouter } from 'react-router-dom';

import { ChildrenProp } from 'types/general';

export const RouterProvider = ({ children }: ChildrenProp) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
