import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { PlanCompany } from './PlanCompany';
import { PlanFree } from './PlanFree';
import { PlanPrincipiante } from './PlanPrincipiante';
import { PlanProfesional } from './PlanProfesional';

import { LayoutPage } from 'pages/@common/layout-page';
import { PaymentPlanType } from 'types/payment';

export const PaymentPlans = () => {
  const { isAuthenticated } = useAuth();
  const { pushRoute, queryToSearch } = useRouter();

  const handleClick = (type: PaymentPlanType) => {
    if (isAuthenticated) {
      pushRoute('/payment-plans/purchase', { type });
    } else {
      pushRoute('/auth/sign-in', {
        redirect: `/payment-plans/purchase?${queryToSearch({ type })}`,
      });
    }
  };

  return (
    <LayoutPage title="Precios">
      <div className="flex items-center gap-6 justify-center flex-wrap">
        {!isAuthenticated && <PlanFree onClick={handleClick} />}
        <PlanPrincipiante onClick={handleClick} />
        <PlanProfesional onClick={handleClick} />
        <PlanCompany onClick={handleClick} />
      </div>
    </LayoutPage>
  );
};
