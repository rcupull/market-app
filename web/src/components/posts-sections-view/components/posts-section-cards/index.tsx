import { CardGroup } from 'components/card-group';
import { CardPost } from 'components/card-post';
import { Swiper } from 'components/swiper';

import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { getOneBusinessRoute, getOnePostRoute } from 'utils/business';

export interface PostsSectionCardsProps extends StyleProps {
  posts: Array<Post> | null;
  business: Business;
  layout: PostsLayoutSection;
  onRefresh: () => void;
}

export const PostsSectionCards = ({
  business,
  posts,
  layout,
  onRefresh,
}: PostsSectionCardsProps) => {
  const { routeName, currency } = business;
  const { type, postType  } = layout;

  const getPostHref = (post: Post): string => {
    const { _id: postId, postLink } = post;

    if (postType === 'product') {
      return getOnePostRoute({ routeName, postId });
    }

    if (postType === 'link') {
      const { type, value } = postLink || {};
      if (!value) {
        console.log('should has some value in href');
        return '#';
      }

      if (type === 'external') {
        return value;
      }

      if (type === 'business') {
        return getOneBusinessRoute({ routeName: value });
      }

      return '#';
    }

    return '#';
  };

  if (type === 'oneRowSlider') {
    return (
      <Swiper
        className="!w-[90%] !sm:w-[80vw] !p-2"
        slidesPerView="auto"
        items={posts?.map((post, index) => {
          return {
            content: (
              <CardPost
                currency={currency}
                key={index}
                post={post}
                layout={layout.postCardLayout}
                href={getPostHref(post)}
                onRefresh={onRefresh}
              />
            ),
          };
        })}
      />
    );
  }

  return (
    <CardGroup layout={layout.postCardLayout}>
      {posts?.map((post, index) => {
        return (
          <CardPost
            currency={currency}
            key={index}
            post={post}
            layout={layout.postCardLayout}
            href={getPostHref(post)}
            onRefresh={onRefresh}
          />
        );
      })}
    </CardGroup>
  );
};
