import { RelatedSection } from './related-section';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';

export interface RelatedSectionsViewProps extends StyleProps {
  postId: string;
  business: Business;
}

export const RelatedSectionsView = ({ postId, business}: RelatedSectionsViewProps) => {
  return (
    <div data-id="RelatedSectionsView" className="flex flex-col w-full">
      <RelatedSection postId={postId} business={business}/>;
    </div>
  );
};