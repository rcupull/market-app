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
import { useInfiniteScrolling } from 'pages/@hooks/useInfiniteScrolling';
import { usePostIdPersistent } from 'pages/@hooks/usePostIdPersistent';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useBusinessNewUpdatePostModal } from 'pages/@modals/useBusinessNewUpdatePostModal';
import { usePostMakeReviewModal } from 'pages/@modals/usePostMakeReviewModal';
import { Post } from 'types/post';

export const PostId = () => {
  const { params } = useRouter();
  const { postId } = params;
  const { businessNewUpdatePostModal } = useBusinessNewUpdatePostModal();

  const postIdPersistent = usePostIdPersistent();
  const businessPageData = useBusiness();
  const { isAuthenticated } = useAuth();
  const { authSignInModal } = useAuthSignInModal();
  const { postMakeReviewModal } = usePostMakeReviewModal();

  /**
   * Summary review
   */
  const { getOneReviewSummary } = useGetOneReviewSummary();

  /**
   * All review
   */
  const { getAllReviews } = useGetAllReviews();

  const infiniteScrollingAllReviews = useInfiniteScrolling({
    fetchPaginatedResources: getAllReviews,
    onFetch: ({ page }) => getAllReviews.fetch({ postId, page, limit: 3 })
  });

  useEffect(() => {
    if (postId) {
      postIdPersistent.fetch({ id: postId });
      getOneReviewSummary.fetch({ postId });
      infiniteScrollingAllReviews.fetch();

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
    changeCB: (rowData, { stockAmountAvailable }) => ({ ...rowData, stockAmountAvailable })
  });

  const business = businessPageData.business;
  const post = hotUpdateObjectData.data;

  if (!post || !business) {
    return <></>;
  }

  const handleAddReview = () => {
    if (!isAuthenticated) {
      authSignInModal.open({ redirect: false });
      return;
    }
    postMakeReviewModal.open({
      postId: post._id,
      onAfterSuccess: () => {
        getOneReviewSummary.fetch({ postId: post._id });
        infiniteScrollingAllReviews.fetch();
      }
    });
  };

  return (
    <LayoutPage title={post?.name}>
      <UpdateSomethingContainer
        title="Editar esta publicación"
        onClick={() => {
          businessNewUpdatePostModal.open({
            postId: post._id,
            onAfterSuccess: () => postIdPersistent.fetch({ id: post._id })
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
                onAddReview={handleAddReview}
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
                  size: 'long'
                }}
              />
            )
          }}
        />
      </UpdateSomethingContainer>

      <PostsReviews
        data={infiniteScrollingAllReviews.data}
        onScrollBottom={infiniteScrollingAllReviews.onScrollBottom}
        status={infiniteScrollingAllReviews.status}
        className="w-full max-w-[50rem]"
        onAddReview={handleAddReview}
      />

      <PostsRelatedView post={post} business={business} />
    </LayoutPage>
  );
};

export default PostId;
