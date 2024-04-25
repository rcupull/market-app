import { Ellipsis } from 'react-css-spinners';

export const LazyLoadFallback = () => (
  <div className="flex justify-center items-center fixed inset-0 z-50">
    <Ellipsis />
  </div>
);
