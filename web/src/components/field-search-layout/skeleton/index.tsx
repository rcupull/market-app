import { MutedBox } from 'components/muted-box';

import { SkeletonSearch } from './Skeleton-Search';

import { SearchLayoutType } from 'types/business';
import { StyleProps } from 'types/general';
import { cn, range } from 'utils/general';

export interface SkeletonProps extends StyleProps {
  searchLayoutType: SearchLayoutType;
}

export const Skeleton = ({ searchLayoutType, className }: SkeletonProps) => {
  const renderBanner = () => {
    return <MutedBox className="!h-30 flex items-center justify-center">Banner</MutedBox>;
  };

  const renderPosts = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between mt-5">
        {range(8).map((index) => (
          <MutedBox key={index} className="!w-full sm:!w-16 !h-16 flex items-center justify-center">
            Post
          </MutedBox>
        ))}
      </div>
    );
  };

  const renderFooter = () => {
    return <MutedBox className="h-9 flex items-center justify-center">Footer</MutedBox>;
  };

  return (
    <div
      className={cn(
        'p-4 flex flex-col items-center gap-4 ring-1 ring-gray-400 m-1 rounded-md',
        className
      )}
    >
      {renderBanner()}

      <div className="w-full sm:w-10/12">
        <SkeletonSearch searchLayoutType={searchLayoutType} active />

        {renderPosts()}
      </div>

      {renderFooter()}
    </div>
  );
};
