import { useMemo } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldSelect } from 'components/field-select';
import { Modal } from 'components/modal';

import { useUpdateAdminUserPlan } from 'features/api/useUpdateAdminUserPlan';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { usePortal } from 'hooks/usePortal';

import { Formik } from 'formik';
import { UserPurchasedPlan } from 'types/auth';

interface State extends Pick<UserPurchasedPlan, 'status'> {}

export interface UpdateUserPlanProps {
  userId: string;
  userPlan: UserPurchasedPlan;
  callAfarResources?: CallAfarResources;
}

export const UpdateUserPlan = ({ userPlan, userId, callAfarResources }: UpdateUserPlanProps) => {
  const { onCallAfar } = useCallFromAfar();
  const { onClose } = useModal();

  const portal = usePortal();
  const { updateAdminUserPlan } = useUpdateAdminUserPlan();

  const initialValues = useMemo<State>(
    () => ({
      status: userPlan.status,
    }),
    [userPlan],
  );

  const content = (
    <Formik<State> initialValues={initialValues} enableReinitialize onSubmit={() => {}}>
      {({ values, isValid }) => {
        return (
          <form className="w-full h-40">
            <FieldSelect
              items={[
                {
                  status: 'current',
                },
                {
                  status: 'validatingPurchase',
                },
                {
                  status: 'historical',
                },
              ]}
              renderOption={({ status }) => status}
              renderValue={({ status }) => status}
              optionToValue={({ status }) => status}
              label="Estado"
              name="status"
              className="w-full"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateAdminUserPlan.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { status } = values;

                  updateAdminUserPlan.fetch(
                    {
                      userId,
                      planId: userPlan._id,
                      update: {
                        status,
                      },
                    },
                    {
                      onAfterSuccess: () => {
                        onClose();
                        onCallAfar(callAfarResources);
                      },
                    },
                  );
                }}
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );

  return (
    <Modal
      title="Actualizar plan"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={portal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
