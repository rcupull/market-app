
import { SettingBox } from 'components/setting-box';

import SvgBootstrap from 'icons/Bootstrap';
import SvgFighterJetSolid from 'icons/FighterJetSolid';
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
import { useBusinessUpdateLogo } from 'pages/@modals/useBusinessUpdateLogo';
import { useBusinessUpdatePostCategories } from 'pages/@modals/useBusinessUpdatePostCategories';
import { useBusinessUpdatePostForm } from 'pages/@modals/useBusinessUpdatePostForm';
import { useBusinessUpdateShopping } from 'pages/@modals/useBusinessUpdateShopping';
import { useBusinessUpdateSocialNetworks } from 'pages/@modals/useBusinessUpdateSocialNetworks';

export const Settings = () => {
  const businessUpdateSocialNetworks = useBusinessUpdateSocialNetworks();
  const businessOnboardingModal = useBusinessOnboardingModal();
  const businessUpdateBanner = useBusinessUpdateBanner();
  const businessUpdateAboutUs = useBusinessUpdateAboutUs();
  const businessUpdateLogo = useBusinessUpdateLogo();
  const businessUpdatePostCategories = useBusinessUpdatePostCategories();
  const businessUpdatePostForm = useBusinessUpdatePostForm();
  const businessUpdateShopping = useBusinessUpdateShopping();

  const { onFetch, business } = useBusiness();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
      {DEVELOPMENT && (
        <SettingBox
          title="Configuración rápida(DEV)"
          description={
            <>
              Configure su negocio para tener online rápidamente las primeras publicaicones.{' '}
              <span className="font-bold">Solo recomendable para negocios recien creados.</span>
            </>
          }
          svg={SvgFighterJetSolid}
          onClick={() => businessOnboardingModal.open()}
        />
      )}

      <SettingBox
        title="Gestión de ventas"
        description="Optimice las ventas de su negocio como mejor desee."
        svg={SvgShoppingCartSolid}
        onClick={() =>
          businessUpdateShopping.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingBox
        title="Redes sociales"
        svg={SvgShareAltSolid}
        description="No dejes de lado tus redes sociales y compártelas con tus clientes."
        onClick={() =>
          businessUpdateSocialNetworks.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingBox
        title="Formulario de publicaciones"
        svg={SvgWpforms}
        description="Personalice su formulario de  publicaciones."
        onClick={() =>
          businessUpdatePostForm.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingBox
        title="Banner"
        svg={SvgBootstrap}
        description="Personaliza tu mejores ofertas con tu banner promocional."
        onClick={() =>
          businessUpdateBanner.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            },
          })
        }
      />

      <SettingBox
        title="Logo"
        description="Representa tu negocio con tu logo personalizado."
        svg={SvgMedrt}
        onClick={() => businessUpdateLogo.open()}
      />

      <SettingBox
        title="Categorías"
        svg={SvgTagsSolid}
        description="Categoriza tus productos y mejorarás tus ventas."
        onClick={() =>
          businessUpdatePostCategories.open({
            onAfterSuccess: () => business && onFetch({ routeName: business?.routeName }),
          })
        }
      />

      <SettingBox
        title="Presentación del negocio"
        description="Aprobecha este espacio para comunicarle a tus clientes los matices de tu negocio."
        svg={SvgUsersSolid}
        onClick={() => businessUpdateAboutUs.open()}
      />
    </div>
  );
};
