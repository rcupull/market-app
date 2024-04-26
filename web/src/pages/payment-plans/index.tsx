import { useEffect } from 'react';

import { useGetAllPaymentPlans } from 'features/api/payment-plans/useGetAllPaymentPlans';
import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { PaymentPlanCard } from './PaymentPlanCard';

import { LayoutPage } from 'pages/@common/layout-page';
import { useAuthSignUpModal } from 'pages/@modals/useAuthSignUpModal';
import { PaymentPlanType } from 'types/payment';

export const PaymentPlans = () => {
  const { isAuthenticated } = useAuth();
  const { pushRoute } = useRouter();
  const { getAllPaymentPlans } = useGetAllPaymentPlans();

  useEffect(() => {
    getAllPaymentPlans.fetch();
  }, []);

  const authSignUpModal = useAuthSignUpModal();

  const handleClick = (type: PaymentPlanType) => {
    if (!isAuthenticated) {
      return authSignUpModal.open();
    }

    pushRoute('/payment-plans/purchase', { type });
  };

  return (
    <LayoutPage title="Precios">
      <div className="flex items-center gap-6 justify-center flex-wrap">
        {getAllPaymentPlans.data && (
          <>
            <PaymentPlanCard
              paymentPlan={getAllPaymentPlans.data.free}
              onClick={() => handleClick('free')}
            />
            <PaymentPlanCard
              paymentPlan={getAllPaymentPlans.data.beginner}
              onClick={() => handleClick('beginner')}
            />
            <PaymentPlanCard
              paymentPlan={getAllPaymentPlans.data.professional}
              onClick={() => handleClick('professional')}
            />
            <PaymentPlanCard
              paymentPlan={getAllPaymentPlans.data.company}
              onClick={() => handleClick('company')}
            />
          </>
        )}
      </div>
    </LayoutPage>
  );
};
