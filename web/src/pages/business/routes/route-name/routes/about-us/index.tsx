import { Navigate } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateAboutUs } from 'pages/@modals/useBusinessUpdateAboutUs';

export interface AboutUsProps {
  routeName: string;
}

export const AboutUs = ({ routeName }: AboutUsProps) => {
  const { business } = useBusiness();
  const { aboutUsPage } = business || {};

  const { description, title, visible } = aboutUsPage || {};

  const businessUpdateAboutUs = useBusinessUpdateAboutUs();

  if (!visible) {
    return <Navigate to={`/${routeName}`} />;
  }

  return (
    <UpdateSomethingContainer
      title="Editar la descripción de mi negocio"
      onClick={() => businessUpdateAboutUs.open()}
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
