import { ButtonDescription } from 'components/button-decription';
import { SettingBox } from 'components/setting-box';

import SvgBell from 'icons/Bell';
import SvgBootstrap from 'icons/Bootstrap';
import SvgFighterJetSolid from 'icons/FighterJetSolid';
import SvgHandshakeSolid from 'icons/HandshakeSolid';
import SvgMedrt from 'icons/Medrt';
import SvgShareAltSolid from 'icons/ShareAltSolid';
import SvgTagsSolid from 'icons/TagsSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import SvgWpforms from 'icons/Wpforms';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessOnboardingModal } from 'pages/@modals/useBusinessOnboardingModal';
import { useBusinessShoppingTermsAndConditionsModal } from 'pages/@modals/useBusinessShoppingTermsAndConditionsModal';
import { useBusinessUpdateAboutUs } from 'pages/@modals/useBusinessUpdateAboutUs';
import { useBusinessUpdateBanner } from 'pages/@modals/useBusinessUpdateBanner';
import { useBusinessUpdateLogo } from 'pages/@modals/useBusinessUpdateLogo';
import { useBusinessUpdateNotifications } from 'pages/@modals/useBusinessUpdateNotifications';
import { useBusinessUpdatePostCategories } from 'pages/@modals/useBusinessUpdatePostCategories';
import { useBusinessUpdatePostForm } from 'pages/@modals/useBusinessUpdatePostForm';
import { useBusinessUpdateSocialNetworks } from 'pages/@modals/useBusinessUpdateSocialNetworks';

export const Settings = () => {
  const businessUpdateSocialNetworks = useBusinessUpdateSocialNetworks();
  const businessOnboardingModal = useBusinessOnboardingModal();
  const businessUpdateBanner = useBusinessUpdateBanner();
  const businessUpdateAboutUs = useBusinessUpdateAboutUs();
  const businessUpdateLogo = useBusinessUpdateLogo();
  const businessUpdatePostCategories = useBusinessUpdatePostCategories();
  const businessUpdatePostForm = useBusinessUpdatePostForm();
  const businessUpdateNotifications = useBusinessUpdateNotifications();
  const businessShoppingTermsAndConditionsModal = useBusinessShoppingTermsAndConditionsModal();

  const { onFetch, business } = useBusiness();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 p-2 sm:p-6 place-items-center">
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
        title="Notificaciones"
        description="Reciba las notificaciones de su negocio por Telegram en tiempo real."
        svg={SvgBell}
        onClick={() =>
          businessUpdateNotifications.open({
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

      <SettingBox
        title="Términos y condiciones para la venta"
        description={
          <div>
            <span>Establece con tu ckiente los términos para la venta de tus productos.</span>
            <ButtonDescription description="Esta información será mostrada cuando el cliente esté creando la orden de compra." />
          </div>
        }
        svg={SvgHandshakeSolid}
        onClick={() => businessShoppingTermsAndConditionsModal.open()}
      />
    </div>
  );
};
