import { Footer as FooterBase } from 'components/footer';

import { useBreakpoints } from 'hooks/useBreakpoints';

import { FooterXs } from './footer-xs';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  const breakpoints = useBreakpoints();
  const { business } = useBusiness();

  const renderFooterXs = () => {
    return <FooterXs {...props} />;
  };

  const renderFooter = () => {
    if (business) {
      const socialLinks = business.socialLinks || {};

      return <FooterBase socialLinks={socialLinks} {...props} />;
    }

    return (
      <FooterBase
        socialLinks={{
          instagram: 'https://www.instagram.com/aseremarket?igsh=MTJ6aDFtYXNrbzJoaQ==',
        }}
        {...props}
      />
    );
  };

  return breakpoints.xs ? renderFooterXs() : renderFooter();
};
