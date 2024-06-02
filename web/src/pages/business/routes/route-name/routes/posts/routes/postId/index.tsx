import { useEffect } from 'react';

import { ClothingProductGrid1 } from 'components/clothing-product-grid-1';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { PostShoppingMethod } from 'components/post-shopping-method';
import { PostsSectionsView } from 'components/posts-sections-view';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages2 } from 'components/product/images/product-images-2';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { Review } from 'components/review';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { usePostIdPersistent } from 'pages/@hooks/usePostIdPersistent';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { usePostMakeReviewModal } from 'pages/@modals/usePostMakeReviewModal';
import { PostsLayoutSection } from 'types/business';

export interface PostIdProps {
  routeName: string;
}
export const PostId = ({ routeName }: PostIdProps) => {
  const { params } = useRouter();
  const { postId } = params;
  const businessNewUpdatePost = useBusinessNewUpdatePost();

  const postIdPersistent = usePostIdPersistent();
  const businessPageData = useBusiness();
  const { isAuthenticated } = useAuth();
  const authSignInModal = useAuthSignInModal();
  const postMakeReviewModal = usePostMakeReviewModal();

  useEffect(() => {
    if (postId) {
      postIdPersistent.fetch({ id: postId });

      return () => {
        postIdPersistent.reset();
      };
    }
  }, [postId]);

  const post = postIdPersistent.data;

  const business = businessPageData.business;

  if (!post || !business) {
    return <></>;
  }

  const getSectionsBelow = (): Array<PostsLayoutSection> => {
    const postsSectionsBelowIds = post.postPageLayout?.postsSectionsBelowIds;

    const allBusinessSections = business?.layouts?.posts?.sections || [];
    return allBusinessSections.filter(({ _id }) => postsSectionsBelowIds?.includes(_id));
  };

  return (
    <UpdateSomethingContainer
      title="Editar esta publicación"
      onClick={() => {
        businessNewUpdatePost.open({
          postId: post._id,
          onAfterSuccess: () => postIdPersistent.fetch({ id: post._id }),
        });
      }}
    >
      <LayoutPage
        title={
          <div className="flex items-center">
            {post?.name}
            <PostShoppingMethod
              post={post}
              layout={post.postPageLayout?.shoppingMethod}
              className="ml-auto"
            />
          </div>
        }
        backButton
      >
        <ClothingProductGrid1
          post={post}
          render={{
            images: (props) => <ProductImages2 {...props} />,
            price: (props) => <ProductPrice1 {...props} />,
            review: (props) => (
              <Review
                {...props}
                onClickToSubmit={() => {
                  if (!isAuthenticated) {
                    authSignInModal.open({ redirect: false });
                    return;
                  }
                  postMakeReviewModal.open({
                    postId: post._id,
                    onAfterSuccess: () => {
                      postIdPersistent.fetch({ id: post._id });
                    },
                  });
                }}
              />
            ),
            colors: (props) => <FieldColorSelect {...props} />,
            clothingSize: (props) => <FieldClothingSizeSelect {...props} />,
            description: (props) => <ProductDescription1 {...props} />,
            highLights: (props) => <ProductHighLights1 {...props} />,
            details: (props) => <ProductDetails1 {...props} />,
          }}
        />

        <PostsSectionsView
          routeName={routeName}
          layouts={getSectionsBelow()}
          visibility="postPage"
        />
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};

export default PostId;
