import { Amount, AmountProps } from 'components/amount';

import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';

export interface PostAmountProps extends AmountProps {
  postId: string;
  onAfterSuccess?: () => void;
}

export const PostAmount = ({ postId, onAfterSuccess, ...props }: PostAmountProps) => {
  const { updateOnePost } = useUpdateOnePost();

  return (
    <Amount
      isBusy={updateOnePost.status.isBusy}
      onChange={(value) => {
        updateOnePost.fetch({ postId, stockAmount: value }, { onAfterSuccess });
      }}
      {...props}
    />
  );
};
