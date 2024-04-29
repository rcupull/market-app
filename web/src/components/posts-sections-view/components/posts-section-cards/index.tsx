import { CardGroup } from 'components/card-group';
import { CardPost } from 'components/card-post';
import { Swiper } from 'components/swiper';

import { CallAfarResources } from 'hooks/useCallFromAfar';

import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { getOnePostRoute } from 'utils/business';

export interface PostsSectionCardsProps extends StyleProps {
  posts: Array<Post> | null;
  business: Business;
  layout: PostsLayoutSection;
  callAfarResources?: CallAfarResources;
}

export const PostsSectionCards = ({
  business,
  posts,
  layout,
  callAfarResources,
}: PostsSectionCardsProps) => {
  const { routeName, whatsAppPhoneNumber } = business;
  const { type } = layout;

  if (type === 'oneRowSlider') {
    return (
      <Swiper
        className="!w-[90vw] !sm:w-[80vw]"
        slidesPerView="auto"
        items={posts?.map((post, index) => {
          const { _id } = post;

          return {
            content: (
              <CardPost
                key={index}
                post={post}
                layout={layout.postCardLayout}
                href={getOnePostRoute({ routeName, postId: _id })}
                whatsAppPhoneNumber={whatsAppPhoneNumber}
                callAfarResources={callAfarResources}
              />
            ),
          };
        })}
      />
    );
  }

  return (
    <CardGroup>
      {posts?.map((post, index) => {
        const { _id } = post;

        return (
          <CardPost
            key={index}
            post={post}
            layout={layout.postCardLayout}
            href={getOnePostRoute({ routeName, postId: _id })}
            whatsAppPhoneNumber={whatsAppPhoneNumber}
            callAfarResources={callAfarResources}
          />
        );
      })}
    </CardGroup>
  );
};
