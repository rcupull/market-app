import { ButtonDescription } from 'components/button-decription';
import { SettingBox } from 'components/setting-box';

import SvgBell from 'icons/Bell';
import SvgBootstrap from 'icons/Bootstrap';
import SvgFighterJetSolid from 'icons/FighterJetSolid';
import SvgHandshakeSolid from 'icons/HandshakeSolid';
import SvgMedrt from 'icons/Medrt';
import SvgMoneyCheckSolid from 'icons/MoneyCheckSolid';
import SvgNetworkWiredSolid from 'icons/NetworkWiredSolid';
import SvgPeopleCarrySolid from 'icons/PeopleCarrySolid';
import SvgShareAltSolid from 'icons/ShareAltSolid';
import SvgShippingFastSolid from 'icons/ShippingFastSolid';
import SvgTagsSolid from 'icons/TagsSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import SvgWpforms from 'icons/Wpforms';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessDeliveryManModal } from 'pages/@modals/useBusinessDeliveryManModal';
import { useBusinessDeliveryModal } from 'pages/@modals/useBusinessDeliveryModal';
import { useBusinessOnboardingModal } from 'pages/@modals/useBusinessOnboardingModal';
import { useBusinessShoppingTermsAndConditionsModal } from 'pages/@modals/useBusinessShoppingTermsAndConditionsModal';
import { useBusinessUpdateAboutUsModal } from 'pages/@modals/useBusinessUpdateAboutUsModal';
import { useBusinessUpdateBankAccounts } from 'pages/@modals/useBusinessUpdateBankAccounts';
import { useBusinessUpdateBannerModal } from 'pages/@modals/useBusinessUpdateBannerModal';
import { useBusinessUpdateLogoModal } from 'pages/@modals/useBusinessUpdateLogoModal';
import { useBusinessUpdateNotificationsModal } from 'pages/@modals/useBusinessUpdateNotificationsModal';
import { useBusinessUpdatePostCategoriesModal } from 'pages/@modals/useBusinessUpdatePostCategoriesModal';
import { useBusinessUpdatePostFormModal } from 'pages/@modals/useBusinessUpdatePostFormModal';
import { useBusinessUpdateSeoModal } from 'pages/@modals/useBusinessUpdateSeoModal';
import { useBusinessUpdateSocialNetworksModal } from 'pages/@modals/useBusinessUpdateSocialNetworksModal';
import { getDeliveryUtils } from 'utils/business';

export const Settings = () => {
  const { businessUpdateSocialNetworksModal } = useBusinessUpdateSocialNetworksModal();
  const { businessOnboardingModal } = useBusinessOnboardingModal();
  const { businessUpdateBannerModal } = useBusinessUpdateBannerModal();
  const { businessUpdateAboutUsModal } = useBusinessUpdateAboutUsModal();
  const { businessUpdateLogoModal } = useBusinessUpdateLogoModal();
  const { businessUpdateSeoModal } = useBusinessUpdateSeoModal();
  const { businessUpdatePostCategoriesModal } = useBusinessUpdatePostCategoriesModal();
  const { businessUpdatePostFormModal } = useBusinessUpdatePostFormModal();
  const { businessUpdateNotificationsModal } = useBusinessUpdateNotificationsModal();
  const { businessShoppingTermsAndConditionsModal } = useBusinessShoppingTermsAndConditionsModal();
  const { businessDeliveryModal } = useBusinessDeliveryModal();
  const { businessDeliveryManModal } = useBusinessDeliveryManModal();
  const { businessUpdateBankAccounts } = useBusinessUpdateBankAccounts();

  const { onFetch, business } = useBusiness();
  const { getIsEnabled } = getDeliveryUtils();

  const enabledDelivery = getIsEnabled({
    deliveryConfig: business?.deliveryConfig
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 p-2 sm:p-6 place-items-center">
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
        description="Reciba las notificaciones de su negocio en tiempo real."
        svg={SvgBell}
        onClick={() =>
          businessUpdateNotificationsModal.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            }
          })
        }
      />

      <SettingBox
        title="Redes sociales"
        svg={SvgShareAltSolid}
        description="No dejes de lado tus redes sociales y compártelas con tus clientes."
        onClick={() =>
          businessUpdateSocialNetworksModal.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            }
          })
        }
      />

      <SettingBox
        title="Formulario de publicaciones"
        svg={SvgWpforms}
        description="Personalice su formulario de  publicaciones."
        onClick={() =>
          businessUpdatePostFormModal.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            }
          })
        }
      />

      <SettingBox
        title="Banner"
        svg={SvgBootstrap}
        description="Personaliza tu mejores ofertas con tu banner promocional."
        onClick={() =>
          businessUpdateBannerModal.open({
            onAfterSuccess: () => {
              business && onFetch({ routeName: business?.routeName });
            }
          })
        }
      />

      <SettingBox
        title="Logo"
        description="Representa tu negocio con tu logo personalizado."
        svg={SvgMedrt}
        onClick={() => businessUpdateLogoModal.open()}
      />

      <SettingBox
        title="Categorías"
        svg={SvgTagsSolid}
        description="Categoriza tus productos y mejorarás tus ventas."
        onClick={() =>
          businessUpdatePostCategoriesModal.open({
            onAfterSuccess: () => business && onFetch({ routeName: business?.routeName })
          })
        }
      />

      <SettingBox
        title="Presentación del negocio"
        description="Aprobecha este espacio para comunicarle a tus clientes los matices de tu negocio."
        svg={SvgUsersSolid}
        onClick={() => businessUpdateAboutUsModal.open()}
      />

      <SettingBox
        title="SEO"
        description="Optimiza los motores de busqueda y mejora la localización de tu negocio en internet."
        svg={SvgNetworkWiredSolid}
        onClick={() => businessUpdateSeoModal.open()}
      />

      <SettingBox
        title="Términos y condiciones para la venta"
        description={
          <div>
            <span>Establece con tu cliente los términos para la venta de tus productos.</span>
            <ButtonDescription description="Esta información será mostrada cuando el cliente esté creando la orden de compra." />
          </div>
        }
        svg={SvgHandshakeSolid}
        onClick={() => businessShoppingTermsAndConditionsModal.open()}
      />

      <SettingBox
        title="Cuentas de banco"
        description={<div>Crea y administra tus cuentas de Banco.</div>}
        svg={SvgMoneyCheckSolid}
        onClick={() => businessUpdateBankAccounts.open()}
      />

      <SettingBox
        title="Entrega al domicilio"
        description={
          <div>
            <span>
              Promueve un servicio completo. Tus productos hasta la puerta de tus clientes.
            </span>
          </div>
        }
        svg={SvgShippingFastSolid}
        onClick={() => businessDeliveryModal.open()}
      />

      {enabledDelivery && (
        <SettingBox
          title="Mensajeros"
          description={
            <div>
              <span>Selecciona los mensajeros para tus entregas.</span>
            </div>
          }
          svg={SvgPeopleCarrySolid}
          onClick={() => businessDeliveryManModal.open()}
        />
      )}
    </div>
  );
};
