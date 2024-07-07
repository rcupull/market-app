import { useEffect } from 'react';

import { ClothingProductGrid1 } from 'components/clothing-product-grid-1';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages2 } from 'components/product/images/product-images-2';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { ProductStockLabel } from 'components/product/stock/product-stock-label';
import { Review } from 'components/review';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { PostsRelatedView } from './PostsRelatedView';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { usePostIdPersistent } from 'pages/@hooks/usePostIdPersistent';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { usePostMakeReviewModal } from 'pages/@modals/usePostMakeReviewModal';

export const PostId = () => {
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

  return (
    <LayoutPage title={<div className="flex items-center">{post?.name}</div>} backButton>
      <UpdateSomethingContainer
        title="Editar esta publicación"
        onClick={() => {
          businessNewUpdatePost.open({
            postId: post._id,
            onAfterSuccess: () => postIdPersistent.fetch({ id: post._id }),
          });
        }}
        className="w-full"
      >
        <ClothingProductGrid1
          currency={business.currency}
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
            stockAvailable: (props) => <ProductStockLabel {...props} />,
          }}
        />
      </UpdateSomethingContainer>

      <PostsRelatedView post={post} business={business} />
    </LayoutPage>
  );
};

export default PostId;
