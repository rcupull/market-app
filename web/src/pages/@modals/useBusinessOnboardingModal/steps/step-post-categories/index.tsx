import { Badge } from 'components/badge';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdatePostCategories/Component';

export interface StepPostcategoriesProps extends OnboardingStepProps {}

export const StepPostcategories = ({ nextButton, backButton }: StepPostcategoriesProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal(nextButton);
  const { business, onFetch } = useBusiness();

  return (
    <div>
      <div className="flex items-start mb-8 gap-4">
        <Badge variant="info" />
        <div>
          Las categorías es la estrategia de clasificación mas usada en nuestro sistema. Nos permite{' '}
          <span className="font-bold">identificar a potenciales compradores</span> para sus
          productos, establecer relaciones para nustras campañas de marketing y{' '}
          <span className="font-bold">visualizar correctamente las publicaciones</span> en la página
          de su nogocio. Algunas categorías de las más usadas relacionadas con su tipo de negocio
          fueron insertadas inicialmente. Puede eliminarlas o agregar otras según usted lo desee.
        </div>
      </div>

      <Component
        portal={portal}
        onAfterSuccess={() => {
          nextAction();
          business && onFetch({ routeName: business.routeName });
        }}
      />
      <StepperButtonContainer leftButton={backButton} rightButton={rightButton} />
    </div>
  );
};
