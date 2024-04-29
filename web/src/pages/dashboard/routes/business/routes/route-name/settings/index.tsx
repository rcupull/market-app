import { UserIcon } from '@heroicons/react/24/outline';

import { SettingsLayout } from './SettingsLayout';

import SvgBootstrap from 'icons/Bootstrap';
import SvgMedrt from 'icons/Medrt';
import SvgShareAltSolid from 'icons/ShareAltSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import SvgTagsSolid from 'icons/TagsSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import SvgWpforms from 'icons/Wpforms';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessOnboardingModal } from 'pages/@modals/useBusinessOnboardingModal';
import { useBusinessUpdateAboutUs } from 'pages/@modals/useBusinessUpdateAboutUs';
import { useBusinessUpdateBanner } from 'pages/@modals/useBusinessUpdateBanner';
import { useBusinessUpdateInfo } from 'pages/@modals/useBusinessUpdateInfo';
import { useBusinessUpdateLogo } from 'pages/@modals/useBusinessUpdateLogo';
import { useBusinessUpdatePostCategories } from 'pages/@modals/useBusinessUpdatePostCategories';
import { useBusinessUpdatePostForm } from 'pages/@modals/useBusinessUpdatePostForm';
import { useBusinessUpdateShopping } from 'pages/@modals/useBusinessUpdateShopping';

export const Settings = () => {
  const businessUpdateInfo = useBusinessUpdateInfo();
  const businessOnboardingModal = useBusinessOnboardingModal();
  const businessUpdateBanner = useBusinessUpdateBanner();
  const businessUpdateAboutUs = useBusinessUpdateAboutUs();
  const businessUpdateLogo = useBusinessUpdateLogo();
  const businessUpdatePostCategories = useBusinessUpdatePostCategories();
  const businessUpdatePostForm = useBusinessUpdatePostForm();
  const businessUpdateShopping = useBusinessUpdateShopping();

  const { onFetch, business } = useBusiness();

  return (
    <div className="flex flex-wrap gap-4">
      <SettingsLayout
        title="Configuración automática"
        svg={UserIcon}
        onClick={() => businessOnboardingModal.open()}
      />

      <SettingsLayout
        title="Gestion de ventas"
        description="Optimice las ventas de su negocio com mejor desee."
        svg={SvgShoppingCartSolid}
        onClick={() =>
          businessUpdateShopping.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingsLayout
        title="Redes sociales"
        svg={SvgShareAltSolid}
        description="No dejes de lado tus redes sociales y compártelas con tus clientes."
        onClick={() =>
          businessUpdateInfo.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingsLayout
        title="Formulario"
        svg={SvgWpforms}
        onClick={() =>
          businessUpdatePostForm.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingsLayout
        title="Banner"
        svg={SvgBootstrap}
        description='Personaliza tu mejores ofertas con tu banner promosional.'
        onClick={() =>
          businessUpdateBanner.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingsLayout
        title="Logo"
        description="Representa tu negocio con tu logo personalizado."
        svg={SvgMedrt}
        onClick={() => businessUpdateLogo.open()}
      />

      <SettingsLayout
        title="Categorías"
        svg={SvgTagsSolid}
        description='Categoriza tus productos y mejorarás tus ventas.'
        onClick={() =>
          businessUpdatePostCategories.open({
            onAfterSuccess: () => business && onFetch({ routeName: business?.routeName }),
          })
        }
      />

      <SettingsLayout
        title="Pagina 'Sobre nosotros'"
        description="Aprobecha el espacio de comunicarle a tus clientes los matices de tu negocio."
        svg={SvgUsersSolid}
        onClick={() => businessUpdateAboutUs.open()}
      />
    </div>
  );
};
