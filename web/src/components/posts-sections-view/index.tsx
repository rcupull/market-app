import { PostsSection } from './components/posts-section';

import { PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';

export interface PostsSectionsViewProps extends StyleProps {
  layouts: Array<PostsLayoutSection>;
  //
  routeName: string;
}

export const PostsSectionsView = ({ routeName, layouts }: PostsSectionsViewProps) => {
  return (
    <div data-id="PostsSectionsView" className="flex flex-col w-full">
      {layouts?.map((layout, index) => {
        return <PostsSection key={index} index={index} routeName={routeName} layout={layout} />;
      })}
    </div>
  );
};
