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
import { ReviewSummaryView } from 'components/review-summary-view';

import { useGetAllReviews } from 'features/api/reviews/useGetAllReviews';
import { useGetOneReviewSummary } from 'features/api/reviews/useGetOneReviewSummary';
import { useAuth } from 'features/api-slices/useAuth';

import { useHotUpdateObjectData } from 'hooks/useHotUpdateObjectData';
import { useRouter } from 'hooks/useRouter';

import { PostsRelatedView } from './PostsRelatedView';
import { PostsReviews } from './PostsReviews';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { usePostIdPersistent } from 'pages/@hooks/usePostIdPersistent';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { usePostMakeReviewModal } from 'pages/@modals/usePostMakeReviewModal';
import { Post } from 'types/post';

export const PostId = () => {
  const { params } = useRouter();
  const { postId } = params;
  const businessNewUpdatePost = useBusinessNewUpdatePost();

  const postIdPersistent = usePostIdPersistent();
  const businessPageData = useBusiness();
  const { isAuthenticated } = useAuth();
  const authSignInModal = useAuthSignInModal();
  const postMakeReviewModal = usePostMakeReviewModal();

  const { getOneReviewSummary } = useGetOneReviewSummary();
  const { getAllReviews } = useGetAllReviews();

  useEffect(() => {
    if (postId) {
      postIdPersistent.fetch({ id: postId });
      getOneReviewSummary.fetch({ postId });
      getAllReviews.fetch({ postId });

      return () => {
        postIdPersistent.reset();
      };
    }
  }, [postId]);

  const hotUpdateObjectData = useHotUpdateObjectData<
    Post,
    { postId: string; stockAmountAvailable: number }
  >({
    data: postIdPersistent.data,
    updateKey: `updatePostAmount`,
    changeCB: (rowData, { stockAmountAvailable }) => ({ ...rowData, stockAmountAvailable }),
  });

  const business = businessPageData.business;
  const post = hotUpdateObjectData.data;

  if (!post || !business) {
    return <></>;
  }

  return (
    <LayoutPage title={post?.name} backButton>
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
              <ReviewSummaryView
                {...props}
                reviewSummary={getOneReviewSummary.data}
                onClickToSubmit={() => {
                  if (!isAuthenticated) {
                    authSignInModal.open({ redirect: false });
                    return;
                  }
                  postMakeReviewModal.open({
                    postId: post._id,
                    onAfterSuccess: () => {
                      postIdPersistent.fetch({ id: post._id });
                      //
                      getOneReviewSummary.fetch({ postId: post._id });
                      getAllReviews.fetch({ postId });
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
            stockAvailable: (props) => (
              <ProductStockLabel
                {...props}
                layout={{
                  size: 'long',
                }}
              />
            ),
          }}
        />
      </UpdateSomethingContainer>

      <PostsReviews data={getAllReviews.data} />

      <PostsRelatedView post={post} business={business} />
    </LayoutPage>
  );
};

export default PostId;
