import { Review } from '.';

export default {
  component: Review,
};

export const Undefined = (): JSX.Element => <Review />;

export const NoReview = (): JSX.Element => <Review value={[0, 0, 0, 0, 0]} />;

export const OneReview = (): JSX.Element => <Review value={[0, 0, 0, 1, 0]} />;

export const SomeReviews = (): JSX.Element => <Review value={[0, 1, 6, 50, 60]} />;
