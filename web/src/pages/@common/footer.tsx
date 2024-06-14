import { Footer as FooterBase } from 'components/footer';

import { useRouter } from 'hooks/useRouter';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  const { isDashboardPage, isAdminPage } = useRouter();

  const { business } = useBusiness();

  if (isDashboardPage || isAdminPage) {
    return <></>;
  }

  if (business) {
    const socialLinks = business.socialLinks || {};

    return <FooterBase socialLinks={socialLinks} {...props} />;
  }

  return <FooterBase socialLinks={{}} {...props} />;
};
