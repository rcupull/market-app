import { SpinnerEllipsis } from 'components/spinner-ellipsis';

export const LazyLoadFallback = () => (
  <div className="flex justify-center items-center fixed inset-0 z-50">
    <SpinnerEllipsis />
  </div>
);
