import { SpinnerEllipsis } from 'components/spinner-ellipsis';

export const SpinnerBox = () => {
  return (
    <div className="bg-white opacity-50 cursor-not-allowed absolute inset-0 flex items-center justify-center">
      <SpinnerEllipsis />
    </div>
  );
};
