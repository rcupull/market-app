import { Button } from 'components/button';

import { useModal } from 'features/modal/useModal';

import { CallAfarResources } from 'hooks/useCallFromAfar';

import { User } from 'types/auth';

interface PaymentHistoryProps {
  user: User;
  callAfarResources?: CallAfarResources;
}

export const PaymentHistory = ({ user, callAfarResources }: PaymentHistoryProps) => {
  const { payment } = user;
  const { planHistory } = payment;

  const { pushModal } = useModal();
  const currentPlan = planHistory[planHistory.length - 1] || {};

  const renderLine = (key: string, value: React.ReactNode) => {
    return (
      <div className="flex justify-between items-center">
        <span className="font-bold text-nowrap mr-2">{`${key}: `}</span>
        <span className="text-nowrap text-gray-500">{`${value}`}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {renderLine('Plan', currentPlan.planType)}
      {renderLine('Estado', currentPlan.status)}
      {renderLine('Trial', currentPlan.trialMode)}
      {renderLine('Código', currentPlan.validationPurchaseCode)}
      <Button
        label="Editar"
        className="mt-4"
        onClick={() =>
          pushModal('UpdateUserPlan', {
            userId: user._id,
            userPlan: currentPlan,
            callAfarResources,
          })
        }
      />
    </div>
  );
};
