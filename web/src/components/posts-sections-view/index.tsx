import { PostsSection } from './components/posts-section';

import { PostsLayoutSection, PostsLayoutSectionVisibility } from 'types/business';
import { StyleProps } from 'types/general';

export interface PostsSectionsViewProps extends StyleProps {
  layouts: Array<PostsLayoutSection>;
  visibility: PostsLayoutSectionVisibility;
  //
  routeName: string;
}

export const PostsSectionsView = ({ routeName, layouts, visibility }: PostsSectionsViewProps) => {
  return (
    <div className="flex flex-col">
      {layouts?.map((layout, index) => {
        return (
          <PostsSection
            key={index}
            index={index}
            routeName={routeName}
            layout={layout}
            visibility={visibility}
          />
        );
      })}
    </div>
  );
};
