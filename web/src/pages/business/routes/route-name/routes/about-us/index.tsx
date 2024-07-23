import { Navigate } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateAboutUsModal } from 'pages/@modals/useBusinessUpdateAboutUsModal';
import { getOneBusinessRoute } from 'utils/business';

export interface AboutUsProps {
  routeName: string;
}

export const AboutUs = ({ routeName }: AboutUsProps) => {
  const { business } = useBusiness();
  const { businessUpdateAboutUsModal } = useBusinessUpdateAboutUsModal();

  if (!business) {
    return <></>;
  }

  const { aboutUsPage } = business;

  const { description, title, visible } = aboutUsPage || {};

  if (!visible) {
    return <Navigate to={getOneBusinessRoute({ routeName })} />;
  }

  return (
    <UpdateSomethingContainer
      title="Editar la descripción de mi negocio"
      onClick={() => businessUpdateAboutUsModal.open()}
    >
      <LayoutPage title={title}>
        {description && (
          <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};

export default AboutUs;
