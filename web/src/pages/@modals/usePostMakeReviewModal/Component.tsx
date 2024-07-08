import { Button } from 'components/button';
import { FieldReviewAverage } from 'components/field-review-average';
import { FieldTextArea } from 'components/field-text-area';
import { Formux } from 'components/formux';

import { useAddOneReview } from 'features/api/reviews/useAddOneReview';

import { Portal } from 'hooks/usePortal';

export interface ComponentProps {
  portal: Portal;
  postId: string;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, postId, onAfterSuccess }: ComponentProps) => {
  const { addOneReview } = useAddOneReview();

  return (
    <Formux<{
      star?: number;
      comment?: string;
    }>
      value={{
        star: undefined,
        comment: '',
      }}
      validate={[
        {
          field: 'star',
          type: 'required',
          message: 'Cuantifica la calidad de este producto.',
        },
        {
          field: 'comment',
          type: 'required',
          message: 'Tu opinión sobre este prodcuto es importante para nosotros.',
        },
      ]}
    >
      {({ value, isValid }) => {
        return (
          <form className="mt-10">
            <FieldReviewAverage label="Review" name="star" />

            <FieldTextArea label="Comentario" name="comment" className="mt-6" />

            {portal.getPortal(
              <Button
                label="Agregar reseña"
                isBusy={addOneReview.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { comment, star } = value;

                  addOneReview.fetch(
                    {
                      postId,
                      comment,
                      star,
                    },
                    {
                      onAfterSuccess,
                    }
                  );
                }}
                className="w-full"
              />
            )}
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
