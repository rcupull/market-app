import { useEffect } from 'react';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useBusinessOnboardingModal } from 'pages/@modals/useBusinessOnboardingModal';
import { BusinessOnboardingSteps } from 'pages/@modals/useBusinessOnboardingModal/types';
import { Business } from 'types/business';
import { isEmpty } from 'utils/general';
import { getAllProductsFields } from 'utils/products';

export interface BusinessConfigProps {
  business: Business;
}

export const BusinessConfig = ({ business }: BusinessConfigProps) => {
  const businessOnboardingModal = useBusinessOnboardingModal();
  const { getAllPosts } = useGetAllPosts();

  const hasPosts = async (b: Business): Promise<boolean> => {
    return new Promise((resolve) => {
      getAllPosts.fetch(
        { routeNames: [b.routeName], includeHidden: true },
        {
          onAfterSuccess: ({ data }) => {
            resolve(!!data.length);
          },
        }
      );
    });
  };
  const handleIsMissing = async (b: Business): Promise<Array<BusinessOnboardingSteps>> => {
    const out: Array<BusinessOnboardingSteps> = [];

    /**
     * Si tiene notificaciones activas pero no tiene configuracion de telegram
     */
    if (!isEmpty(b?.notificationFlags) && !b?.telegramBotChat) {
      out.push('notifications');
    }

    /**
     * si tiene config de banner activa pero no tiene imagenes en el banner
     */
    if (b?.layouts?.banner?.type !== 'none' && isEmpty(b?.bannerImages)) {
      out.push('banner');
    }

    /**
     * si no tienen secciones activas
     */
    if (!b?.layouts?.posts?.sections.length) {
      out.push('section');
    }

    /**
     * si no tiene productos activos
     */
    if (!(await hasPosts(b))) {
      out.push('products');
    }

    /**
     * si no ha podificado el formulario de los productos
     */
    if (b.postFormFields?.length === getAllProductsFields().length) {
      out.push('productsForm');
    }

    return out;
  };

  const handleCheck = async (b: Business) => {
    if (!business.doneOnboarding) {
      const steps = await handleIsMissing(b);
      businessOnboardingModal.open({ steps });
    }
  };

  useEffect(() => {
    handleCheck(business);
  }, [business.routeName]);

  return <></>;
};
